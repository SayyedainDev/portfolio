// ResumePhysicsScene.jsx
// Physics-Driven Exploding and Reassembling Document Animation
// Uses React-Three-Fiber + Rapier Physics + GSAP ScrollTrigger

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
  FRAGMENT_COUNT: 150,
  FRAGMENT_SIZE: { width: 0.15, height: 0.1, depth: 0.02 },
  DOCUMENT_SIZE: { width: 2.5, height: 3.5 },
  ACCENT_COLOR: '#40E0D0',
  SECONDARY_COLOR: '#EC4899',
  EXPLOSION_FORCE: 15,
  GRAVITY: -9.81,
  REASSEMBLE_DURATION: 2.5,
};

// Target positions for server rack silhouette (normalized -1 to 1)
const SERVER_RACK_SHAPE = [
  // Main rack body
  ...Array.from({ length: 20 }, (_, i) => ({ x: -0.8, y: 0.9 - i * 0.09, z: 0 })),
  ...Array.from({ length: 20 }, (_, i) => ({ x: 0.8, y: 0.9 - i * 0.09, z: 0 })),
  // Server units (horizontal bars)
  ...Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 12 }, (_, col) => ({
      x: -0.6 + col * 0.1,
      y: 0.7 - row * 0.22,
      z: 0.05,
    }))
  ).flat(),
  // LEDs/indicators
  ...Array.from({ length: 8 }, (_, i) => ({ x: 0.65, y: 0.7 - i * 0.22, z: 0.1 })),
];

// ============================================================================
// FRAGMENT COMPONENT (Individual physics-enabled piece)
// ============================================================================
const Fragment = React.forwardRef(({
  index,
  initialPosition,
  targetPosition,
  phase,
  color,
  onReady
}, ref) => {
  const rigidBodyRef = useRef();
  const meshRef = useRef();
  const [isKinematic, setIsKinematic] = useState(false);
  const animationProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3());

  // Store ref for parent access
  useEffect(() => {
    if (rigidBodyRef.current && ref) {
      ref.current = rigidBodyRef.current;
    }
    if (onReady && rigidBodyRef.current) {
      onReady(index, rigidBodyRef.current);
    }
  }, [index, ref, onReady]);

  // Handle phase transitions
  useEffect(() => {
    if (!rigidBodyRef.current) return;

    if (phase === 'explode') {
      // Apply explosion impulse
      const rb = rigidBodyRef.current;
      rb.setBodyType(0); // Dynamic
      setIsKinematic(false);

      // Random explosion direction
      const angle = Math.random() * Math.PI * 2;
      const upForce = Math.random() * CONFIG.EXPLOSION_FORCE * 0.5 + CONFIG.EXPLOSION_FORCE * 0.5;
      const sideForce = (Math.random() - 0.5) * CONFIG.EXPLOSION_FORCE;

      rb.applyImpulse({
        x: Math.cos(angle) * sideForce,
        y: upForce,
        z: Math.sin(angle) * sideForce * 0.5,
      }, true);

      // Apply random torque for tumbling
      rb.applyTorqueImpulse({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
      }, true);
    }
    else if (phase === 'reassemble') {
      // Capture current position and switch to kinematic
      const rb = rigidBodyRef.current;
      const pos = rb.translation();
      startPos.current.set(pos.x, pos.y, pos.z);
      animationProgress.current = 0;

      // Switch to kinematic for controlled animation
      rb.setBodyType(1); // Kinematic
      setIsKinematic(true);
    }
    else if (phase === 'resting') {
      // Reset to initial position
      const rb = rigidBodyRef.current;
      rb.setBodyType(1); // Kinematic
      rb.setTranslation(initialPosition, true);
      rb.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      setIsKinematic(true);
    }
  }, [phase, initialPosition]);

  // Animate reassembly
  useFrame((state, delta) => {
    if (phase === 'reassemble' && isKinematic && rigidBodyRef.current) {
      animationProgress.current = Math.min(animationProgress.current + delta / CONFIG.REASSEMBLE_DURATION, 1);

      // Eased interpolation
      const t = easeOutBack(animationProgress.current);

      currentPos.current.lerpVectors(
        startPos.current,
        new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z),
        t
      );

      rigidBodyRef.current.setNextKinematicTranslation(currentPos.current);

      // Smooth rotation to identity
      const currentRot = rigidBodyRef.current.rotation();
      const targetRot = { x: 0, y: 0, z: 0, w: 1 };
      rigidBodyRef.current.setNextKinematicRotation({
        x: THREE.MathUtils.lerp(currentRot.x, targetRot.x, t),
        y: THREE.MathUtils.lerp(currentRot.y, targetRot.y, t),
        z: THREE.MathUtils.lerp(currentRot.z, targetRot.z, t),
        w: THREE.MathUtils.lerp(currentRot.w, targetRot.w, t),
      });
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={[initialPosition.x, initialPosition.y, initialPosition.z]}
      type="kinematicPosition"
      colliders="cuboid"
      restitution={0.3}
      friction={0.8}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[
          CONFIG.FRAGMENT_SIZE.width,
          CONFIG.FRAGMENT_SIZE.height,
          CONFIG.FRAGMENT_SIZE.depth
        ]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </RigidBody>
  );
});

Fragment.displayName = 'Fragment';

// ============================================================================
// EASING FUNCTIONS
// ============================================================================
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// ============================================================================
// DOCUMENT FRAGMENTS SYSTEM
// ============================================================================
function DocumentFragments({ phase, onPhaseComplete }) {
  const fragmentRefs = useRef([]);
  const [fragmentsReady, setFragmentsReady] = useState(0);

  // Generate initial document grid positions and target positions
  const { initialPositions, targetPositions, colors } = useMemo(() => {
    const initPos = [];
    const targetPos = [];
    const cols = [];

    const gridCols = Math.ceil(Math.sqrt(CONFIG.FRAGMENT_COUNT * (CONFIG.DOCUMENT_SIZE.width / CONFIG.DOCUMENT_SIZE.height)));
    const gridRows = Math.ceil(CONFIG.FRAGMENT_COUNT / gridCols);

    for (let i = 0; i < CONFIG.FRAGMENT_COUNT; i++) {
      const row = Math.floor(i / gridCols);
      const col = i % gridCols;

      // Initial position (document shape)
      initPos.push({
        x: (col / gridCols - 0.5) * CONFIG.DOCUMENT_SIZE.width,
        y: (0.5 - row / gridRows) * CONFIG.DOCUMENT_SIZE.height,
        z: 0,
      });

      // Target position (server rack shape)
      const shapeIndex = i % SERVER_RACK_SHAPE.length;
      const shapePos = SERVER_RACK_SHAPE[shapeIndex];
      targetPos.push({
        x: shapePos.x * 1.5,
        y: shapePos.y * 2,
        z: shapePos.z,
      });

      // Color gradient based on position
      const t = i / CONFIG.FRAGMENT_COUNT;
      cols.push(t < 0.7 ? CONFIG.ACCENT_COLOR : CONFIG.SECONDARY_COLOR);
    }

    return { initialPositions: initPos, targetPositions: targetPos, colors: cols };
  }, []);

  const handleFragmentReady = useCallback((index, ref) => {
    fragmentRefs.current[index] = ref;
    setFragmentsReady(prev => prev + 1);
  }, []);

  // Notify when reassembly is complete
  useEffect(() => {
    if (phase === 'reassemble') {
      const timer = setTimeout(() => {
        if (onPhaseComplete) onPhaseComplete('assembled');
      }, CONFIG.REASSEMBLE_DURATION * 1000 + 500);
      return () => clearTimeout(timer);
    }
  }, [phase, onPhaseComplete]);

  return (
    <>
      {initialPositions.map((pos, i) => (
        <Fragment
          key={i}
          index={i}
          initialPosition={pos}
          targetPosition={targetPositions[i]}
          phase={phase}
          color={colors[i]}
          onReady={handleFragmentReady}
        />
      ))}
    </>
  );
}

// ============================================================================
// GROUND PLANE (for physics collision)
// ============================================================================
function Ground() {
  return (
    <RigidBody type="fixed" position={[0, -3, 0]}>
      <CuboidCollider args={[10, 0.1, 10]} />
      <mesh receiveShadow>
        <boxGeometry args={[20, 0.2, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.5}
        />
      </mesh>
    </RigidBody>
  );
}

// ============================================================================
// SCENE LIGHTING
// ============================================================================
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color={CONFIG.ACCENT_COLOR} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color={CONFIG.SECONDARY_COLOR} />
    </>
  );
}

// ============================================================================
// CAMERA CONTROLLER
// ============================================================================
function CameraController({ phase }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));

  useEffect(() => {
    if (phase === 'explode') {
      targetPosition.current.set(0, 2, 10);
    } else if (phase === 'reassemble') {
      targetPosition.current.set(0, 0, 7);
    } else {
      targetPosition.current.set(0, 0, 8);
    }
  }, [phase]);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================================================
// MAIN PHYSICS SCENE (R3F Canvas content)
// ============================================================================
function PhysicsScene({ phase, onPhaseComplete }) {
  return (
    <Physics gravity={[0, CONFIG.GRAVITY, 0]} debug={false}>
      <CameraController phase={phase} />
      <Lighting />
      <DocumentFragments phase={phase} onPhaseComplete={onPhaseComplete} />
      <Ground />
    </Physics>
  );
}

// ============================================================================
// MAIN EXPORT: RESUME PHYSICS SCENE COMPONENT
// ============================================================================
export default function ResumePhysicsScene() {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('resting'); // 'resting' | 'explode' | 'reassemble' | 'assembled'
  const [isVisible, setIsVisible] = useState(false);

  // ScrollTrigger setup
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          setIsVisible(true);
          // Start explosion after a brief delay
          setTimeout(() => setPhase('explode'), 500);
        },
        onLeave: () => {
          // Trigger reassembly when scrolling past
          if (phase === 'explode') {
            setPhase('reassemble');
          }
        },
        onEnterBack: () => {
          setIsVisible(true);
          // Reset if scrolling back
          if (phase === 'assembled') {
            setPhase('explode');
          }
        },
        onLeaveBack: () => {
          // Reset to resting when scrolling back up
          setPhase('resting');
        },
      });

      // Secondary trigger for reassembly
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'center center',
        onEnter: () => {
          if (phase === 'explode') {
            setTimeout(() => setPhase('reassemble'), 1500);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  const handlePhaseComplete = useCallback((completedPhase) => {
    if (completedPhase === 'assembled') {
      // Animation complete - fragments are now in server rack shape
      console.log('Reassembly complete');
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#121212]" />

      {/* Section title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {phase === 'resting' && 'My Resume'}
          {phase === 'explode' && 'Deconstructing...'}
          {phase === 'reassemble' && 'Rebuilding Infrastructure'}
          {phase === 'assembled' && 'Technical Stack'}
        </h2>
        <p className="text-gray-400 text-sm">
          {phase === 'resting' && 'Scroll to transform'}
          {phase === 'explode' && 'Breaking down into components'}
          {phase === 'reassemble' && 'Forming server architecture'}
          {phase === 'assembled' && 'Cloud-native foundation'}
        </p>
      </div>

      {/* Phase indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {['resting', 'explode', 'reassemble', 'assembled'].map((p) => (
          <div
            key={p}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              phase === p
                ? 'bg-accent scale-125'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* R3F Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <PhysicsScene phase={phase} onPhaseComplete={handlePhaseComplete} />
      </Canvas>

      {/* Accent glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${CONFIG.ACCENT_COLOR}10 0%, transparent 50%)`,
          opacity: phase === 'reassemble' || phase === 'assembled' ? 1 : 0,
        }}
      />
    </section>
  );
}

// Named export
export { ResumePhysicsScene };
