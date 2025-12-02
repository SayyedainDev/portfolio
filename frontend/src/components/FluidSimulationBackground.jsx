// FluidSimulationBackground.jsx
// Real-Time 2D Fluid Dynamics Simulation using GPGPU with WebGL
// Implements Navier-Stokes equations via multi-pass FBO rendering

import React, { useRef, useEffect, useCallback } from 'react';

// ============================================================================
// GLSL SHADER SOURCES
// ============================================================================

// Base vertex shader - fullscreen quad
const baseVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;

  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Splat shader - adds impulse (velocity/dye) at mouse position
const splatShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;

  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// Advection shader - moves quantities along velocity field (semi-Lagrangian)
const advectionShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;

  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = dissipation * texture2D(uSource, coord);
    float decay = 1.0 + dissipation * 0.001;
    gl_FragColor = result / decay;
  }
`;

// Curl shader - computes vorticity (curl of velocity field)
const curlShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

// Vorticity confinement shader - amplifies rotational motion
const vorticityShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;

  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Divergence shader - computes divergence of velocity field
const divergenceShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// Clear shader - clears buffer with pressure value
const clearShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;

  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

// Pressure solver shader - Jacobi iteration for pressure
const pressureShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// Gradient subtraction shader - makes velocity field divergence-free
const gradientSubtractShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Display shader - renders dye with color grading
const displayShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float time;

  // Color palette for electric/plasma effect
  vec3 palette(float t) {
    vec3 a = vec3(0.1, 0.1, 0.2);
    vec3 b = vec3(0.3, 0.4, 0.4);
    vec3 c = vec3(0.0, 0.5, 0.6);
    vec3 d = vec3(0.25, 0.56, 0.87);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float intensity = length(c);

    // Electric teal color scheme matching portfolio theme
    vec3 teal = vec3(0.251, 0.878, 0.816);  // #40E0D0
    vec3 pink = vec3(0.925, 0.282, 0.6);     // #EC4899
    vec3 purple = vec3(0.545, 0.361, 0.965); // #8B5CF6

    // Color mixing based on intensity and channels
    vec3 color = mix(teal, pink, c.r * 0.5);
    color = mix(color, purple, c.g * 0.3);
    color *= intensity * 1.5;

    // Add subtle glow
    color += teal * pow(intensity, 3.0) * 0.3;

    // Vignette
    vec2 uv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(uv * 0.5, uv * 0.5);
    color *= vignette;

    // Gamma correction
    color = pow(color, vec3(0.85));

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ============================================================================
// WEBGL UTILITY FUNCTIONS
// ============================================================================

function getWebGLContext(canvas) {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  let gl = canvas.getContext('webgl2', params);
  const isWebGL2 = !!gl;

  if (!isWebGL2) {
    gl = canvas.getContext('webgl', params) ||
         canvas.getContext('experimental-webgl', params);
  }

  let halfFloat;
  let supportLinearFiltering;

  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float');
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat?.HALF_FLOAT_OES || gl.FLOAT);

  let formatRGBA;
  let formatRG;
  let formatR;

  if (isWebGL2) {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = formatRGBA;
    formatR = formatRGBA;
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}

function getSupportedFormat(gl, internalFormat, format, type) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return { internalFormat, format };
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return null;
  }

  const uniforms = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const uniformName = gl.getActiveUniform(program, i).name;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }

  return { program, uniforms };
}

// ============================================================================
// FRAMEBUFFER OBJECT (FBO) CLASS
// ============================================================================

class FBO {
  constructor(gl, ext, w, h, internalFormat, format, type, filtering) {
    this.gl = gl;
    this.width = w;
    this.height = h;

    gl.activeTexture(gl.TEXTURE0);

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  attach(id) {
    this.gl.activeTexture(this.gl.TEXTURE0 + id);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    return id;
  }
}

// Double FBO for ping-pong rendering
class DoubleFBO {
  constructor(gl, ext, w, h, internalFormat, format, type, filtering) {
    this.gl = gl;
    this.width = w;
    this.height = h;
    this.read = new FBO(gl, ext, w, h, internalFormat, format, type, filtering);
    this.write = new FBO(gl, ext, w, h, internalFormat, format, type, filtering);
  }

  swap() {
    const temp = this.read;
    this.read = this.write;
    this.write = temp;
  }
}

// ============================================================================
// FLUID SIMULATION COMPONENT
// ============================================================================

export default function FluidSimulationBackground() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationRef = useRef(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    moved: false,
    color: { r: 0.25, g: 0.88, b: 0.82 }, // Teal
  });

  // Simulation configuration
  const config = useRef({
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 1.0,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    PAUSED: false,
  });

  // Initialize WebGL context and simulation
  const initSimulation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl) return null;

    const simRes = getResolution(config.current.SIM_RESOLUTION);
    const dyeRes = getResolution(config.current.DYE_RESOLUTION);

    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const texType = ext.halfFloatTexType;

    if (!rgba || !rg || !r) {
      console.warn('Fluid simulation: required texture formats not supported');
      return null;
    }

    // Create simulation buffers
    let dye = new DoubleFBO(gl, ext, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    let velocity = new DoubleFBO(gl, ext, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    let divergence = new FBO(gl, ext, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    let curl = new FBO(gl, ext, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    let pressure = new DoubleFBO(gl, ext, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    // Create shader programs
    const programs = {
      splat: createProgram(gl, baseVertexShader, splatShader),
      advection: createProgram(gl, baseVertexShader, advectionShader),
      divergence: createProgram(gl, baseVertexShader, divergenceShader),
      curl: createProgram(gl, baseVertexShader, curlShader),
      vorticity: createProgram(gl, baseVertexShader, vorticityShader),
      pressure: createProgram(gl, baseVertexShader, pressureShader),
      clear: createProgram(gl, baseVertexShader, clearShader),
      gradientSubtract: createProgram(gl, baseVertexShader, gradientSubtractShader),
      display: createProgram(gl, baseVertexShader, displayShader),
    };

    // Verify all programs compiled
    for (const [name, prog] of Object.entries(programs)) {
      if (!prog) {
        console.error(`Failed to create ${name} program`);
        return null;
      }
    }

    // Create vertex buffer for fullscreen quad
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    // Utility to bind program and set vertex attrib
    function blit(target) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
        return { width: max, height: min };
      }
      return { width: min, height: max };
    }

    return {
      gl,
      ext,
      programs,
      buffers: { dye, velocity, divergence, curl, pressure },
      blit,
      getResolution,
      simRes,
      dyeRes,
    };
  }, []);

  // Main simulation step
  const step = useCallback((ctx, dt) => {
    if (!ctx) return;

    const { gl, programs, buffers, blit } = ctx;
    const { dye, velocity, divergence, curl, pressure } = buffers;
    const cfg = config.current;

    gl.disable(gl.BLEND);

    // Setup vertex attributes
    const positionLocation = gl.getAttribLocation(programs.advection.program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // --- Curl ---
    gl.useProgram(programs.curl.program);
    gl.uniform2f(programs.curl.uniforms.texelSize, velocity.read.width, velocity.read.height);
    gl.uniform1i(programs.curl.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    // --- Vorticity Confinement ---
    gl.useProgram(programs.vorticity.program);
    gl.uniform2f(programs.vorticity.uniforms.texelSize, velocity.read.width, velocity.read.height);
    gl.uniform1i(programs.vorticity.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(programs.vorticity.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(programs.vorticity.uniforms.curl, cfg.CURL);
    gl.uniform1f(programs.vorticity.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    // --- Divergence ---
    gl.useProgram(programs.divergence.program);
    gl.uniform2f(programs.divergence.uniforms.texelSize, velocity.read.width, velocity.read.height);
    gl.uniform1i(programs.divergence.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    // --- Clear Pressure ---
    gl.useProgram(programs.clear.program);
    gl.uniform1i(programs.clear.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(programs.clear.uniforms.value, cfg.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    // --- Pressure Solve (Jacobi Iteration) ---
    gl.useProgram(programs.pressure.program);
    gl.uniform2f(programs.pressure.uniforms.texelSize, velocity.read.width, velocity.read.height);
    gl.uniform1i(programs.pressure.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < cfg.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(programs.pressure.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    // --- Gradient Subtract ---
    gl.useProgram(programs.gradientSubtract.program);
    gl.uniform2f(programs.gradientSubtract.uniforms.texelSize, velocity.read.width, velocity.read.height);
    gl.uniform1i(programs.gradientSubtract.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(programs.gradientSubtract.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    // --- Advect Velocity ---
    gl.useProgram(programs.advection.program);
    gl.uniform2f(programs.advection.uniforms.texelSize, 1.0 / velocity.read.width, 1.0 / velocity.read.height);
    gl.uniform1i(programs.advection.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(programs.advection.uniforms.uSource, velocity.read.attach(0));
    gl.uniform1f(programs.advection.uniforms.dt, dt);
    gl.uniform1f(programs.advection.uniforms.dissipation, cfg.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    // --- Advect Dye ---
    gl.uniform2f(programs.advection.uniforms.texelSize, 1.0 / dye.read.width, 1.0 / dye.read.height);
    gl.uniform1i(programs.advection.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(programs.advection.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(programs.advection.uniforms.dissipation, cfg.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  }, []);

  // Apply splat (impulse) at pointer position
  const splat = useCallback((ctx, x, y, dx, dy, color) => {
    if (!ctx) return;

    const { gl, programs, buffers, blit } = ctx;
    const { dye, velocity } = buffers;
    const cfg = config.current;

    gl.useProgram(programs.splat.program);
    gl.uniform1i(programs.splat.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(programs.splat.uniforms.aspectRatio, gl.drawingBufferWidth / gl.drawingBufferHeight);
    gl.uniform2f(programs.splat.uniforms.point, x, y);
    gl.uniform3f(programs.splat.uniforms.color, dx * cfg.SPLAT_FORCE, dy * cfg.SPLAT_FORCE, 0.0);
    gl.uniform1f(programs.splat.uniforms.radius, correctRadius(cfg.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(programs.splat.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(programs.splat.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();

    function correctRadius(radius) {
      const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }
  }, []);

  // Render to screen
  const render = useCallback((ctx, time) => {
    if (!ctx) return;

    const { gl, programs, buffers, blit } = ctx;

    gl.useProgram(programs.display.program);
    gl.uniform1i(programs.display.uniforms.uTexture, buffers.dye.read.attach(0));
    gl.uniform1f(programs.display.uniforms.time, time);
    blit(null);
  }, []);

  // Generate random splats for ambient effect
  const generateRandomSplats = useCallback((ctx, amount) => {
    const colors = [
      { r: 0.25, g: 0.88, b: 0.82 },   // Teal
      { r: 0.93, g: 0.28, b: 0.6 },    // Pink
      { r: 0.55, g: 0.36, b: 0.97 },   // Purple
      { r: 0.98, g: 0.75, b: 0.15 },   // Yellow
    ];

    for (let i = 0; i < amount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random();
      const y = Math.random();
      const dx = (Math.random() - 0.5) * 0.001;
      const dy = (Math.random() - 0.5) * 0.001;
      splat(ctx, x, y, dx, dy, color);
    }
  }, [splat]);

  // Handle mouse/touch input
  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;

    const pointer = pointerRef.current;
    pointer.deltaX = x - pointer.x;
    pointer.deltaY = y - pointer.y;
    pointer.x = x;
    pointer.y = y;
    pointer.moved = true;

    // Cycle through colors based on position
    const hue = (x + y) * 0.5;
    if (hue < 0.33) {
      pointer.color = { r: 0.25, g: 0.88, b: 0.82 }; // Teal
    } else if (hue < 0.66) {
      pointer.color = { r: 0.93, g: 0.28, b: 0.6 }; // Pink
    } else {
      pointer.color = { r: 0.55, g: 0.36, b: 0.97 }; // Purple
    }
  }, []);

  // Main effect - setup and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resizeCanvas();

    // Initialize
    const ctx = initSimulation();
    if (!ctx) {
      console.warn('WebGL not supported or initialization failed');
      return;
    }
    contextRef.current = ctx;

    // Initial splats
    setTimeout(() => generateRandomSplats(ctx, 5), 100);

    // Animation loop
    let lastTime = performance.now();
    let time = 0;

    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.016666);
      lastTime = currentTime;
      time += dt;

      // Handle pointer input
      const pointer = pointerRef.current;
      if (pointer.moved) {
        pointer.moved = false;
        splat(ctx, pointer.x, pointer.y, pointer.deltaX, pointer.deltaY, pointer.color);
      }

      // Ambient splats every few seconds
      if (Math.random() < 0.002) {
        generateRandomSplats(ctx, 1);
      }

      // Simulation step
      step(ctx, dt);

      // Render
      render(ctx, time);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      // Reinitialize on significant resize
      const newCtx = initSimulation();
      if (newCtx) {
        contextRef.current = newCtx;
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handlePointerMove(touch);
    }, { passive: false });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
    };
  }, [initSimulation, step, splat, render, generateRandomSplats, handlePointerMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #0a0a0a 100%)',
      }}
    />
  );
}

export { FluidSimulationBackground };
