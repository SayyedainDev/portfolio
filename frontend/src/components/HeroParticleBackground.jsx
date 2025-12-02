// HeroParticleBackground.jsx
// Advanced GPU-accelerated particle system using React-Three-Fiber
// Creates an interactive starfield/code-stream effect with mouse parallax

import React, { useRef, useMemo, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================================
// GLSL VERTEX SHADER
// Handles particle positioning, time-based animation, and mouse interaction
// ============================================================================
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute float aScale;
  attribute float aRandomness;

  varying vec3 vColor;
  varying float vDistance;

  void main() {
    vec3 pos = position;

    // Organic wave motion based on time and position
    float wave1 = sin(pos.x * 0.5 + uTime * 0.3 + aRandomness * 6.28) * 0.15;
    float wave2 = cos(pos.y * 0.4 + uTime * 0.25 + aRandomness * 3.14) * 0.15;
    float wave3 = sin(pos.z * 0.3 + uTime * 0.2) * 0.1;

    pos.x += wave2;
    pos.y += wave1;
    pos.z += wave3;

    // Mouse parallax interaction (depth-based influence)
    float depth = (pos.z + 5.0) / 10.0; // Normalize depth 0-1
    float mouseInfluence = 1.0 - depth; // Closer particles react more

    pos.x += uMouse.x * mouseInfluence * 0.8;
    pos.y += uMouse.y * mouseInfluence * 0.8;

    // Mouse repulsion effect (particles push away from cursor)
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec2 screenPos = mvPosition.xy / -mvPosition.z;
    float distToCursor = length(screenPos - uMouse * 2.0);
    float repulsion = smoothstep(0.0, 1.5, distToCursor);

    pos.xy += normalize(pos.xy - uMouse * 5.0) * (1.0 - repulsion) * 0.3 * mouseInfluence;

    // Recalculate model-view position after modifications
    mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Distance-based color variation (for vColor in fragment shader)
    vDistance = length(pos);

    // Cyan-to-white color gradient based on depth and randomness
    float colorMix = depth * 0.5 + aRandomness * 0.5;
    vColor = mix(
      vec3(0.251, 0.878, 0.816), // Accent cyan #40E0D0
      vec3(0.6, 0.9, 1.0),       // Light cyan-white
      colorMix
    );

    // Add subtle color variation
    vColor += vec3(aRandomness * 0.1, aRandomness * 0.05, aRandomness * 0.15);

    // Calculate point size with perspective and randomness
    float sizeVariation = aScale * (0.8 + aRandomness * 0.4);
    gl_PointSize = uSize * sizeVariation * uPixelRatio * (1.0 / -mvPosition.z);

    // Clamp minimum size for visibility
    gl_PointSize = max(gl_PointSize, 1.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ============================================================================
// GLSL FRAGMENT SHADER
// Handles particle appearance: soft circular shape with glow effect
// ============================================================================
const fragmentShader = `
  uniform float uTime;

  varying vec3 vColor;
  varying float vDistance;

  void main() {
    // Create soft circular particle with smooth edges
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    // Discard pixels outside circle radius
    if (dist > 0.5) discard;

    // Soft edge falloff for glow effect
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

    // Add subtle pulsing/twinkling effect
    float twinkle = sin(uTime * 3.0 + vDistance * 2.0) * 0.15 + 0.85;
    alpha *= twinkle;

    // Distance-based fade (further particles are more transparent)
    float distanceFade = smoothstep(8.0, 3.0, vDistance);
    alpha *= distanceFade * 0.9;

    // Core glow (brighter center)
    float core = 1.0 - smoothstep(0.0, 0.2, dist);
    vec3 finalColor = vColor + vec3(core * 0.3);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ============================================================================
// PARTICLES COMPONENT
// Core Three.js points mesh with custom shader material
// ============================================================================
function Particles({ count = 6000 }) {
  const mesh = useRef();
  const { viewport, mouse } = useThree();

  // Memoized particle attribute arrays (created once)
  const { positions, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      // Radius with variance for depth
      const radius = 3 + Math.random() * 4;

      // Convert spherical to cartesian coordinates
      positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(phi) - 2; // Offset Z for depth

      // Add some positional noise for organic feel
      positions[i3] += (Math.random() - 0.5) * 2;
      positions[i3 + 1] += (Math.random() - 0.5) * 2;
      positions[i3 + 2] += (Math.random() - 0.5) * 2;

      // Random scale for size variation
      scales[i] = Math.random() * 1.5 + 0.5;

      // Random value for shader variations
      randomness[i] = Math.random();
    }

    return { positions, scales, randomness };
  }, [count]);

  // Shader uniforms (mutable reference)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 30 },
  }), []);

  // Smooth mouse tracking with lerp
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  // Animation frame loop
  useFrame((state) => {
    if (!mesh.current) return;

    // Update time uniform
    uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse interpolation (lerp)
    targetMouse.current.set(
      mouse.x * viewport.width * 0.5,
      mouse.y * viewport.height * 0.5
    );

    currentMouse.current.lerp(targetMouse.current, 0.05);
    uniforms.uMouse.value.copy(currentMouse.current);

    // Subtle global rotation for ambient motion
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={count}
          array={randomness}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================================================
// MAIN EXPORT COMPONENT
// Canvas wrapper with performance optimizations and Tailwind container
// ============================================================================
export default function HeroParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-[#121212]">
      <Suspense fallback={
        // Fallback gradient while WebGL initializes
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#1a2a2a] to-[#121212]" />
      }>
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 60,
            near: 0.1,
            far: 100
          }}
          dpr={[1, 2]} // Clamp pixel ratio for performance
          gl={{
            antialias: false, // Disable for particle systems
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: false,
          }}
          style={{ background: 'transparent' }}
        >
          <Particles count={5000} />
        </Canvas>
      </Suspense>

      {/* Bottom gradient fade for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent pointer-events-none" />
    </div>
  );
}

// Named export for flexibility
export { HeroParticleBackground };
