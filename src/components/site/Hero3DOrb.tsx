import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useMotionValue, useSpring, useScroll, useMotionValueEvent } from "motion/react";
import * as THREE from "three";

function HeroKnot({
  mouseX,
  mouseY,
  scrollR,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  scrollR: ReturnType<typeof useMotionValue<number>>;
}) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const sx = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const mx = sx.get();
    const my = sy.get();
    const s = scrollR.get();

    if (outer.current) {
      // mouse + scroll driven rotation
      outer.current.rotation.y += dt * 0.25 + s * 0.01;
      outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, my * 0.8, 0.08);
      outer.current.rotation.z = THREE.MathUtils.lerp(outer.current.rotation.z, mx * 0.4, 0.08);
      outer.current.position.y = Math.sin(t * 0.8) * 0.15 - s * 2;
      const scale = 1 + s * 0.3;
      outer.current.scale.setScalar(scale);
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.6;
      inner.current.rotation.x += dt * 0.3;
    }
    if (core.current) {
      core.current.rotation.x += dt * 0.4;
      core.current.rotation.z -= dt * 0.5;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={outer}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Outer iridescent shell */}
        <mesh castShadow>
          <torusKnotGeometry args={[1.1, 0.36, 220, 32, 2, 3]} />
          <MeshTransmissionMaterial
            color="#0aff9d"
            thickness={1.2}
            roughness={0.05}
            transmission={1}
            ior={1.6}
            chromaticAberration={0.6}
            anisotropy={0.5}
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0.15}
            iridescence={1}
            iridescenceIOR={1.8}
            iridescenceThicknessRange={[100, 800]}
            backside
            samples={6}
            resolution={512}
          />
        </mesh>

        {/* Internal twisted ribbon */}
        <mesh ref={inner} scale={0.55}>
          <torusKnotGeometry args={[1, 0.18, 180, 24, 3, 5]} />
          <meshPhysicalMaterial
            color="#7c4dff"
            metalness={1}
            roughness={0.15}
            iridescence={1}
            iridescenceIOR={2.4}
            iridescenceThicknessRange={[200, 1200]}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Glowing core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[0.32, 2]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={2.4}
            toneMapped={false}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#10b981" />
      <pointLight position={[-4, -2, -4]} intensity={2} color="#a855f7" />
      <pointLight position={[3, -3, 3]} intensity={1.5} color="#06b6d4" />
    </>
  );
}

export function Hero3DOrb() {
  const wrap = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollR = useMotionValue(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    scrollR.set(Math.min(v / window.innerHeight, 1.5));
  });

  function onMove(e: React.MouseEvent) {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-[520px] w-full cursor-grab active:cursor-grabbing md:h-[640px]"
      data-cursor
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <HeroKnot mouseX={mouseX} mouseY={mouseY} scrollR={scrollR} />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.4}
            scale={8}
            blur={3}
            far={3}
            color="#10b981"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
