import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type AffiliateSpaceSceneProps = {
  isDark: boolean;
  reducedMotion: boolean;
};

function BeaconCluster({ isDark, reducedMotion }: AffiliateSpaceSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitARef = useRef<THREE.Mesh>(null);
  const orbitBRef = useRef<THREE.Mesh>(null);
  const orbitCRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.position.x = 7.8 + Math.sin(elapsed * 0.12) * 0.55;
    groupRef.current.position.y = 1.8 + Math.cos(elapsed * 0.1) * 0.4;
    groupRef.current.rotation.z = elapsed * (reducedMotion ? 0.08 : 0.16);

    if (orbitARef.current) {
      orbitARef.current.position.x = Math.cos(elapsed * 0.58) * 2.1;
      orbitARef.current.position.y = Math.sin(elapsed * 0.58) * 1.2;
      orbitARef.current.position.z = Math.sin(elapsed * 0.32) * 0.5;
    }

    if (orbitBRef.current) {
      orbitBRef.current.position.x = Math.cos(elapsed * 0.46 + 1.4) * 3.1;
      orbitBRef.current.position.y = Math.sin(elapsed * 0.46 + 1.4) * 1.8;
      orbitBRef.current.position.z = Math.cos(elapsed * 0.22 + 0.2) * 0.7;
    }

    if (orbitCRef.current) {
      orbitCRef.current.position.x = Math.cos(elapsed * 0.72 + 2.2) * 1.3;
      orbitCRef.current.position.y = Math.sin(elapsed * 0.72 + 2.2) * 2.2;
      orbitCRef.current.position.z = Math.sin(elapsed * 0.44 + 0.8) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.05, 36, 36]} />
        <meshStandardMaterial
          color={isDark ? "#14284f" : "#afc7f3"}
          emissive={isDark ? "#57b7ff" : "#5b88db"}
          emissiveIntensity={isDark ? 0.58 : 0.26}
          roughness={0.86}
          metalness={0.08}
        />
      </mesh>

      <mesh rotation={[0.74, 0.2, 0.3]}>
        <torusGeometry args={[2.4, 0.04, 18, 160]} />
        <meshBasicMaterial
          color={isDark ? "#88d9ff" : "#74a3f1"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.28 : 0.14}
          transparent
        />
      </mesh>
      <mesh rotation={[1.1, 0.42, -0.2]}>
        <torusGeometry args={[3.45, 0.03, 18, 160]} />
        <meshBasicMaterial
          color={isDark ? "#ffb36b" : "#f0a676"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.16 : 0.08}
          transparent
        />
      </mesh>

      <mesh ref={orbitARef}>
        <sphereGeometry args={[0.24, 18, 18]} />
        <meshStandardMaterial
          color="#fff1e5"
          emissive="#ffd4aa"
          emissiveIntensity={0.2}
          roughness={0.78}
        />
      </mesh>
      <mesh ref={orbitBRef}>
        <sphereGeometry args={[0.19, 18, 18]} />
        <meshStandardMaterial
          color="#ebfbff"
          emissive="#79c8ff"
          emissiveIntensity={0.28}
          roughness={0.8}
        />
      </mesh>
      <mesh ref={orbitCRef}>
        <sphereGeometry args={[0.14, 18, 18]} />
        <meshStandardMaterial
          color="#ffe3cf"
          emissive="#ff926d"
          emissiveIntensity={0.24}
          roughness={0.82}
        />
      </mesh>
    </group>
  );
}

function SignalArcs({ isDark, reducedMotion }: AffiliateSpaceSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.z = elapsed * (reducedMotion ? 0.05 : 0.1);
    groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.2;
  });

  return (
    <group ref={groupRef} position={[-4.8, -1.6, -10]}>
      <mesh rotation={[0.2, -0.18, 0.44]}>
        <torusGeometry args={[5.2, 0.16, 20, 180, Math.PI * 1.1]} />
        <meshBasicMaterial
          color={isDark ? "#44dcff" : "#8bb9ff"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.14 : 0.08}
          transparent
        />
      </mesh>
      <mesh rotation={[0.64, 0.42, -0.28]}>
        <torusGeometry args={[4.1, 0.12, 20, 180, Math.PI * 1.2]} />
        <meshBasicMaterial
          color={isDark ? "#8790ff" : "#a7b8ff"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.12 : 0.06}
          transparent
        />
      </mesh>
      <mesh rotation={[-0.3, 0.18, 0.88]}>
        <torusGeometry args={[3.05, 0.08, 20, 180, Math.PI * 0.98]} />
        <meshBasicMaterial
          color={isDark ? "#ffb07e" : "#ffcfb6"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.1 : 0.05}
          transparent
        />
      </mesh>
    </group>
  );
}

function AffiliateComets({ isDark, reducedMotion }: AffiliateSpaceSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.z = elapsed * (reducedMotion ? 0.018 : 0.03);
    groupRef.current.position.x = Math.sin(elapsed * 0.16) * 0.45;
    groupRef.current.position.y = Math.cos(elapsed * 0.12) * 0.32;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-8.8, 4.2, -4.8]} rotation={[0, 0, -0.34]}>
        <planeGeometry args={[3.8, 0.08]} />
        <meshBasicMaterial
          color={isDark ? "#dbf2ff" : "#aac6f5"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.09 : 0.05}
          transparent
        />
      </mesh>
      <mesh position={[-7.15, 3.64, -4.64]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.32 : 0.16}
          transparent
        />
      </mesh>

      <mesh position={[4.2, -4.8, -6.2]} rotation={[0, 0, 0.44]}>
        <planeGeometry args={[2.9, 0.07]} />
        <meshBasicMaterial
          color={isDark ? "#ffc89a" : "#ffddc7"}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.08 : 0.04}
          transparent
        />
      </mesh>
      <mesh position={[5.46, -4.2, -6.08]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color="#fffaf4"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={isDark ? 0.28 : 0.14}
          transparent
        />
      </mesh>
    </group>
  );
}

function SceneRoot(props: AffiliateSpaceSceneProps) {
  return (
    <>
      <color
        attach="background"
        args={[props.isDark ? "#02050d" : "#edf4fe"]}
      />
      <fog attach="fog" args={[props.isDark ? "#02050d" : "#edf4fe", 10, 52]} />
      <ambientLight intensity={props.isDark ? 0.52 : 0.64} />
      <directionalLight
        color={props.isDark ? "#7fd2ff" : "#c4dcff"}
        intensity={props.isDark ? 1.2 : 0.8}
        position={[7, 5, 12]}
      />
      <pointLight
        color={props.isDark ? "#52b6ff" : "#7ca5ef"}
        intensity={props.isDark ? 10 : 4}
        distance={28}
        position={[7.8, 1.8, -3]}
      />
      <pointLight
        color={props.isDark ? "#ffae6d" : "#efbf98"}
        intensity={props.isDark ? 5 : 2}
        distance={26}
        position={[-4.8, -1.6, -8]}
      />
      <Stars
        count={props.reducedMotion ? 1800 : 3400}
        depth={110}
        factor={props.reducedMotion ? 4.2 : 6.3}
        fade
        radius={220}
        saturation={0}
        speed={props.reducedMotion ? 0.18 : 0.34}
      />
      <SignalArcs {...props} />
      <BeaconCluster {...props} />
      <AffiliateComets {...props} />
    </>
  );
}

export function AffiliateSpaceScene({
  isDark,
  reducedMotion,
}: AffiliateSpaceSceneProps) {
  return (
    <div
      aria-hidden
      className={`sc-affiliate-space-scene ${isDark ? "is-dark" : "is-light"} ${reducedMotion ? "is-reduced-motion" : ""}`}
    >
      <Canvas
        camera={{ fov: 48, position: [0.4, 0.2, 15] }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneRoot isDark={isDark} reducedMotion={reducedMotion} />
      </Canvas>
      <div className="sc-affiliate-space-overlay">
        <div className="sc-affiliate-space-haze sc-affiliate-space-haze--cyan" />
        <div className="sc-affiliate-space-haze sc-affiliate-space-haze--amber" />
        <div className="sc-affiliate-space-haze sc-affiliate-space-haze--violet" />
        <div className="sc-affiliate-space-grid" />
        <div className="sc-affiliate-space-beam" />
      </div>
    </div>
  );
}
