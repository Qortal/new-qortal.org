import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type BlackHoleSceneProps = {
  isDark: boolean;
  liteMode: boolean;
  progress: number;
  reducedMotion: boolean;
};

type SceneProps = Omit<BlackHoleSceneProps, "liteMode">;

type VortexParticle = {
  angle: number;
  radius: number;
  depth: number;
  speed: number;
  lift: number;
  wobble: number;
};

function getSingularityVisibility(progress: number) {
  return THREE.MathUtils.clamp((progress - 0.05) / 0.66, 0, 1);
}

function buildVortexParticles(
  count: number,
  radiusMax: number,
  radiusMin: number,
  depthNear: number,
  depthFar: number,
  speedBase: number,
): VortexParticle[] {
  return Array.from({ length: count }, () => {
    const depthMix = Math.pow(Math.random(), 0.72);
    const depth = THREE.MathUtils.lerp(depthNear, depthFar, depthMix);
    const radius = THREE.MathUtils.lerp(
      radiusMax,
      radiusMin,
      Math.pow(depthMix, 0.82),
    );

    return {
      angle: Math.random() * Math.PI * 2,
      radius: radius + (Math.random() - 0.5) * radius * 0.22,
      depth,
      speed: speedBase + Math.random() * speedBase * 0.8,
      lift: (Math.random() - 0.5) * 0.22,
      wobble: Math.random() * Math.PI * 2,
    };
  });
}

function createStarSpriteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.98)");
  gradient.addColorStop(0.42, "rgba(195,225,255,0.82)");
  gradient.addColorStop(0.72, "rgba(118,170,255,0.24)");
  gradient.addColorStop(1, "rgba(118,170,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createPlanetTexture(
  baseColor: string,
  accentColor: string,
  detailColor: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let band = 0; band < 22; band += 1) {
    const y = (band / 22) * canvas.height;
    const height = 10 + Math.random() * 18;
    context.globalAlpha = 0.08 + Math.random() * 0.12;
    context.fillStyle = band % 2 === 0 ? accentColor : detailColor;
    context.fillRect(0, y, canvas.width, height);
  }

  for (let patch = 0; patch < 48; patch += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radiusX = 18 + Math.random() * 46;
    const radiusY = 8 + Math.random() * 24;

    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, Math.random(), 0, Math.PI * 2);
    context.fillStyle = patch % 3 === 0 ? detailColor : accentColor;
    context.globalAlpha = 0.06 + Math.random() * 0.14;
    context.fill();
  }

  context.globalAlpha = 0.18;
  const stormGradient = context.createRadialGradient(
    380,
    118,
    12,
    380,
    118,
    92,
  );
  stormGradient.addColorStop(0, detailColor);
  stormGradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = stormGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createShootingStarTailTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createLinearGradient(0, 16, 256, 16);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.45, "rgba(255,228,210,0.04)");
  gradient.addColorStop(0.78, "rgba(255,224,202,0.22)");
  gradient.addColorStop(0.92, "rgba(255,244,235,0.72)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function CameraRig({ progress, reducedMotion }: SceneProps) {
  const targetPosition = useRef(new THREE.Vector3(0, 0, 13));

  useFrame((state) => {
    const nextZ = THREE.MathUtils.lerp(13.6, 2.4, progress);
    const nextY = THREE.MathUtils.lerp(0.45, -0.72, progress);
    const nextX = THREE.MathUtils.lerp(0.95, 0.02, progress);
    const perspectiveCamera = state.camera as THREE.PerspectiveCamera;

    targetPosition.current.set(nextX, nextY, nextZ);
    perspectiveCamera.position.lerp(
      targetPosition.current,
      reducedMotion ? 0.025 : 0.07,
    );
    perspectiveCamera.fov = THREE.MathUtils.lerp(
      perspectiveCamera.fov,
      reducedMotion ? 50 : 50 - progress * 11,
      0.06,
    );
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}

function NebulaClouds({ progress, reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const persistence = 1 - THREE.MathUtils.clamp((progress - 0.82) / 0.18, 0, 1);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    groupRef.current.rotation.y += delta * (reducedMotion ? 0.006 : 0.013);
    groupRef.current.position.z = -10 + progress * 4;
    groupRef.current.position.x =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.6;
    groupRef.current.position.y =
      Math.cos(state.clock.elapsedTime * 0.06) * 0.4;
    groupRef.current.scale.setScalar(0.96 + persistence * 0.08);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-12.6, 5.2, -12]} scale={[12.4, 5.3, 5.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#724eff"
          depthWrite={false}
          opacity={0.15 * persistence}
          transparent
        />
      </mesh>
      <mesh position={[11.8, -1.1, -9]} scale={[11.4, 4.8, 5.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#28c7ff"
          depthWrite={false}
          opacity={0.15 * persistence}
          transparent
        />
      </mesh>
      <mesh position={[-1.2, -5.8, -11]} scale={[10.4, 3.6, 4.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#ff7fcb"
          depthWrite={false}
          opacity={0.09 * persistence}
          transparent
        />
      </mesh>
      <mesh position={[5.2, 6.4, -15]} scale={[9, 3.1, 3.6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#8fa5ff"
          depthWrite={false}
          opacity={0.08 * persistence}
          transparent
        />
      </mesh>
    </group>
  );
}

function OrbitingBodies({ progress, reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftPlanetRef = useRef<THREE.Mesh>(null);
  const rightPlanetRef = useRef<THREE.Mesh>(null);
  const leftMoonPrimaryRef = useRef<THREE.Mesh>(null);
  const leftMoonSecondaryRef = useRef<THREE.Mesh>(null);
  const rightMoonRef = useRef<THREE.Mesh>(null);
  const leftPlanetTexture = useMemo(
    () => createPlanetTexture("#1d3558", "#2d5d94", "#0b1628"),
    [],
  );
  const rightPlanetTexture = useMemo(
    () => createPlanetTexture("#3c1416", "#6b231e", "#210b0c"),
    [],
  );
  const moonTexture = useMemo(
    () => createPlanetTexture("#8c7a73", "#b9a198", "#5b4d49"),
    [],
  );
  const persistence = 1 - THREE.MathUtils.clamp((progress - 0.8) / 0.2, 0, 1);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.z = elapsed * (reducedMotion ? 0.012 : 0.02);
    groupRef.current.position.z = THREE.MathUtils.lerp(-7, -1.5, progress);

    if (leftPlanetRef.current) {
      leftPlanetRef.current.position.x = -9.8 + Math.sin(elapsed * 0.18) * 0.45;
      leftPlanetRef.current.position.y = 3.6 + Math.cos(elapsed * 0.14) * 0.35;
      leftPlanetRef.current.rotation.y += reducedMotion ? 0.002 : 0.005;
      leftPlanetRef.current.scale.setScalar(1.04 + persistence * 0.1);
    }

    if (leftMoonPrimaryRef.current) {
      leftMoonPrimaryRef.current.position.x =
        -9.8 + Math.cos(elapsed * 0.38) * (2.1 + persistence * 0.22);
      leftMoonPrimaryRef.current.position.y =
        3.6 + Math.sin(elapsed * 0.38) * (1.05 + persistence * 0.08);
      leftMoonPrimaryRef.current.position.z =
        -5.95 + Math.sin(elapsed * 0.24 + 0.4) * 0.42;
    }

    if (leftMoonSecondaryRef.current) {
      leftMoonSecondaryRef.current.position.x =
        -9.8 + Math.cos(elapsed * 0.54 + 1.2) * (2.7 + persistence * 0.24);
      leftMoonSecondaryRef.current.position.y =
        3.6 + Math.sin(elapsed * 0.54 + 1.2) * (1.34 + persistence * 0.12);
      leftMoonSecondaryRef.current.position.z =
        -5.4 + Math.cos(elapsed * 0.28 + 0.7) * 0.35;
    }

    if (rightPlanetRef.current) {
      rightPlanetRef.current.position.x =
        10.8 + Math.cos(elapsed * 0.16 + 0.7) * 0.55;
      rightPlanetRef.current.position.y =
        -4.4 + Math.sin(elapsed * 0.12 + 0.9) * 0.42;
      rightPlanetRef.current.rotation.y += reducedMotion ? 0.0016 : 0.004;
      rightPlanetRef.current.scale.setScalar(0.9 + persistence * 0.1);
    }

    if (rightMoonRef.current) {
      rightMoonRef.current.position.x =
        10.8 + Math.cos(elapsed * 0.44) * (1.7 + persistence * 0.2);
      rightMoonRef.current.position.y =
        -4.4 + Math.sin(elapsed * 0.44) * (0.95 + persistence * 0.12);
      rightMoonRef.current.position.z = -6.6 + Math.sin(elapsed * 0.22) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={leftPlanetRef} position={[-9.8, 3.6, -5.8]}>
        <sphereGeometry args={[1.82, 40, 40]} />
        <meshStandardMaterial
          color="#284b79"
          emissive="#4f9dff"
          emissiveIntensity={0.18 * persistence}
          map={leftPlanetTexture}
          roughness={0.96}
          metalness={0.04}
        />
      </mesh>
      <mesh position={[-9.8, 3.6, -6.1]} scale={[2.7, 2.7, 2.7]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#7fc0ff"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.05 * persistence}
        />
      </mesh>
      <mesh ref={leftMoonPrimaryRef} position={[-7.8, 4.2, -5.9]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial
          color="#c9d7e9"
          emissive="#88bfff"
          emissiveIntensity={0.09 * persistence}
          map={moonTexture}
          roughness={0.9}
        />
      </mesh>
      <mesh ref={leftMoonSecondaryRef} position={[-12.3, 2.7, -5.45]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color="#d8e2f0"
          emissive="#7fb4ff"
          emissiveIntensity={0.07 * persistence}
          map={moonTexture}
          roughness={0.92}
        />
      </mesh>

      <mesh ref={rightPlanetRef} position={[10.8, -4.4, -6.8]}>
        <sphereGeometry args={[1.18, 40, 40]} />
        <meshStandardMaterial
          color="#471719"
          emissive="#b34738"
          emissiveIntensity={0.16 * persistence}
          map={rightPlanetTexture}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[10.8, -4.4, -7.05]} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ff7a63"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.042 * persistence}
        />
      </mesh>
      <mesh ref={rightMoonRef} position={[12.2, -4.1, -6.6]}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial
          color="#d6c7c0"
          emissive="#ffb57f"
          emissiveIntensity={0.1 * persistence}
          map={moonTexture}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

type ShootingStarConfig = {
  color: string;
  depth: number;
  drift: number;
  duration: number;
  startX: number;
  startY: number;
  travelX: number;
  travelY: number;
  length: number;
  rotation: number;
  offset: number;
};

function ShootingStars({ progress, reducedMotion }: SceneProps) {
  const groupRefs = useRef<Array<THREE.Group | null>>([]);
  const tailTexture = useMemo(() => createShootingStarTailTexture(), []);
  const configs = useMemo<ShootingStarConfig[]>(
    () => [
      {
        color: "#ffe3d4",
        depth: -4.2,
        drift: 0.12,
        duration: 0.18,
        startX: -13.2,
        startY: 5.8,
        travelX: 9.6,
        travelY: -4.2,
        length: 3.6,
        rotation: -0.42,
        offset: 0.08,
      },
      {
        color: "#ffd0b4",
        depth: -5.4,
        drift: 0.16,
        duration: 0.14,
        startX: 12.8,
        startY: 4.4,
        travelX: -8.8,
        travelY: -2.8,
        length: 2.8,
        rotation: 0.32,
        offset: 0.41,
      },
      {
        color: "#fff0e6",
        depth: -6.2,
        drift: 0.1,
        duration: 0.16,
        startX: -10.6,
        startY: -0.8,
        travelX: 7.2,
        travelY: -3.8,
        length: 2.4,
        rotation: -0.52,
        offset: 0.72,
      },
    ],
    [],
  );
  const persistence = 1 - THREE.MathUtils.clamp((progress - 0.9) / 0.1, 0, 1);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    configs.forEach((config, index) => {
      const group = groupRefs.current[index];
      if (!group) {
        return;
      }

      const cycle = (elapsed * config.drift + config.offset) % 1;
      const isActive = cycle < config.duration && persistence > 0;
      group.visible = isActive;

      if (!isActive) {
        return;
      }

      const local = cycle / config.duration;
      group.position.x = config.startX + config.travelX * local;
      group.position.y = config.startY + config.travelY * local;
      group.position.z = config.depth;
      group.rotation.z = config.rotation;
      group.scale.setScalar(reducedMotion ? 0.94 : 1);

      group.children.forEach((child, childIndex) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;

        if (childIndex === 0) {
          material.opacity =
            (0.04 + (1 - local) * 0.1) *
            persistence *
            (reducedMotion ? 0.7 : 1);
        } else {
          material.opacity =
            (0.16 + (1 - local) * 0.24) *
            persistence *
            (reducedMotion ? 0.7 : 1);
        }
      });
    });
  });

  return (
    <group>
      {configs.map((config, index) => (
        <group
          key={`${config.color}-${config.offset}`}
          ref={(node) => {
            groupRefs.current[index] = node;
          }}
          visible={false}
        >
          <mesh position={[-config.length * 0.48, 0, 0]}>
            <planeGeometry args={[config.length, 0.065]} />
            <meshBasicMaterial
              color={config.color}
              alphaMap={tailTexture}
              blending={THREE.AdditiveBlending}
              transparent
              depthWrite={false}
              map={tailTexture}
              opacity={0}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.11, 18, 18]} />
            <meshBasicMaterial
              color="#fff8f0"
              blending={THREE.AdditiveBlending}
              transparent
              depthWrite={false}
              opacity={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CometField({ progress, reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const persistence = 1 - THREE.MathUtils.clamp((progress - 0.86) / 0.14, 0, 1);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.z = elapsed * (reducedMotion ? 0.01 : 0.018);
    groupRef.current.position.x = Math.sin(elapsed * 0.12) * 0.45;
    groupRef.current.position.y = Math.cos(elapsed * 0.1) * 0.32;
    groupRef.current.scale.setScalar(0.95 + persistence * 0.08);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-6.2, -1.6, -4.8]} rotation={[0, 0, -0.52]}>
        <planeGeometry args={[3.2, 0.12]} />
        <meshBasicMaterial
          color="#e8f7ff"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.13 * persistence}
        />
      </mesh>
      <mesh position={[-4.9, -1.9, -4.7]}>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshBasicMaterial
          color="#f8fdff"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.34 * persistence}
        />
      </mesh>
      <mesh position={[7.8, 2.8, -5.6]} rotation={[0, 0, 0.44]}>
        <planeGeometry args={[2.6, 0.1]} />
        <meshBasicMaterial
          color="#9fe0ff"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.1 * persistence}
        />
      </mesh>
      <mesh position={[8.9, 3.05, -5.45]}>
        <sphereGeometry args={[0.1, 18, 18]} />
        <meshBasicMaterial
          color="#ecfbff"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.28 * persistence}
        />
      </mesh>
    </group>
  );
}

function VortexField({
  color,
  count,
  radiusMax,
  radiusMin,
  progress,
  reducedMotion,
  size,
  opacity,
  speedBase,
  verticalSpread,
  pullStrength,
  driftX = 0,
  tiltX = 0,
}: {
  color: string;
  count: number;
  radiusMax: number;
  radiusMin: number;
  progress: number;
  reducedMotion: boolean;
  size: number;
  opacity: number;
  speedBase: number;
  verticalSpread: number;
  pullStrength: number;
  driftX?: number;
  tiltX?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const spriteTexture = useMemo(() => createStarSpriteTexture(), []);
  const particles = useMemo(
    () => buildVortexParticles(count, radiusMax, radiusMin, -32, 8, speedBase),
    [count, radiusMax, radiusMin, speedBase],
  );
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const visibility = getSingularityVisibility(progress);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const sink = THREE.MathUtils.lerp(0.84, 0.34, progress);
    const funnelTightness = THREE.MathUtils.lerp(1.04, pullStrength, progress);

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const stride = index * 3;
      const normalizedDepth = THREE.MathUtils.clamp(
        (particle.depth + 32) / 40,
        0,
        1,
      );
      const swirl =
        particle.angle +
        elapsed * particle.speed +
        normalizedDepth * 7.5 +
        progress * 5.5;
      const wobble =
        Math.sin(
          elapsed * (0.22 + particle.speed * 0.16) +
            particle.wobble +
            normalizedDepth * 5.5,
        ) * 0.42;
      const radius =
        particle.radius *
        THREE.MathUtils.lerp(1.18, 0.24, normalizedDepth * funnelTightness);

      positions[stride] =
        Math.cos(swirl) * radius + wobble * 0.7 + driftX * normalizedDepth;
      positions[stride + 1] =
        Math.sin(swirl * 1.18 + particle.wobble) * radius * verticalSpread +
        particle.lift * radius * 1.45 +
        wobble * 0.28;
      positions[stride + 2] = particle.depth * sink;
    }

    const geometry = pointsRef.current.geometry;
    const attribute = geometry.getAttribute("position");
    attribute.needsUpdate = true;
    pointsRef.current.rotation.x = tiltX;
    pointsRef.current.rotation.z = elapsed * (reducedMotion ? 0.004 : 0.011);
    pointsRef.current.position.z = progress * 2.8;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        alphaMap={spriteTexture}
        blending={THREE.AdditiveBlending}
        color={color}
        depthWrite={false}
        map={spriteTexture}
        opacity={opacity * (0.48 + visibility * 0.52)}
        size={size}
        sizeAttenuation
        alphaTest={0.02}
        transparent
      />
    </points>
  );
}

function Singularity({ isDark, progress, reducedMotion }: SceneProps) {
  const matteRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const lensRef = useRef<THREE.Mesh>(null);
  const visibility = getSingularityVisibility(progress);
  const scaleTarget = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((state) => {
    if (coreRef.current) {
      const coreScale = 0.86 + visibility * 1.05;
      scaleTarget.current.set(coreScale, coreScale, coreScale);
      coreRef.current.scale.lerp(
        scaleTarget.current,
        reducedMotion ? 0.03 : 0.08,
      );
    }

    if (matteRef.current) {
      const matteScale = 0.98 + visibility * 1.08;
      matteRef.current.scale.lerp(
        new THREE.Vector3(matteScale, matteScale, matteScale),
        reducedMotion ? 0.03 : 0.08,
      );
    }

    if (haloRef.current) {
      const pulse =
        1 +
        Math.sin(state.clock.elapsedTime * (reducedMotion ? 0.5 : 1.35)) *
          0.025;
      const haloScale = (1.1 + visibility * 0.92) * pulse;
      haloRef.current.scale.lerp(
        new THREE.Vector3(haloScale, haloScale, haloScale),
        reducedMotion ? 0.03 : 0.07,
      );
    }

    if (lensRef.current) {
      lensRef.current.rotation.z = state.clock.elapsedTime * 0.03;
      const lensScale = 1 + visibility * 0.34;
      lensRef.current.scale.lerp(
        new THREE.Vector3(lensScale, lensScale, lensScale),
        reducedMotion ? 0.03 : 0.06,
      );
    }
  });

  return (
    <group>
      <mesh ref={haloRef}>
        <sphereGeometry args={[3.2, 40, 40]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={isDark ? "#ff8756" : "#e59675"}
          depthWrite={false}
          opacity={(isDark ? 0.026 : 0.012) * (0.24 + visibility * 0.4)}
          transparent
        />
      </mesh>
      <mesh ref={lensRef}>
        <sphereGeometry args={[2.15, 36, 36]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#ffd7c6"
          depthWrite={false}
          opacity={(isDark ? 0.028 : 0.014) * (0.2 + visibility * 0.34)}
          transparent
        />
      </mesh>
      <mesh scale={[1.55, 1.55, 1.55]}>
        <sphereGeometry args={[2.4, 36, 36]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={isDark ? "#9f2b22" : "#cb7863"}
          depthWrite={false}
          opacity={(isDark ? 0.012 : 0.006) * (0.22 + visibility * 0.28)}
          transparent
        />
      </mesh>
      <mesh ref={matteRef} renderOrder={24}>
        <sphereGeometry args={[1.98, 48, 48]} />
        <meshBasicMaterial
          color="#000000"
          depthTest={false}
          depthWrite={false}
          opacity={0.96}
          transparent
        />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.74, 48, 48]} />
        <meshBasicMaterial
          color="#000000"
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SceneRoot(props: SceneProps) {
  return (
    <>
      <color
        attach="background"
        args={[props.isDark ? "#02030a" : "#edf3fb"]}
      />
      <fog attach="fog" args={[props.isDark ? "#02030a" : "#edf3fb", 12, 48]} />
      <ambientLight intensity={props.isDark ? 0.46 : 0.58} />
      <directionalLight
        color={props.isDark ? "#8bccff" : "#d7e6ff"}
        intensity={props.isDark ? 1.15 : 0.82}
        position={[6, 5, 12]}
      />
      <pointLight
        color={props.isDark ? "#5aacff" : "#89b1ff"}
        intensity={props.isDark ? 12 : 6}
        distance={24}
        position={[0, 0, 0]}
      />
      <pointLight
        color="#7f5cff"
        intensity={props.isDark ? 3 : 1.4}
        distance={28}
        position={[-8, 4, -10]}
      />
      <pointLight
        color="#2fcfff"
        intensity={props.isDark ? 3.5 : 1.6}
        distance={28}
        position={[9, -3, -8]}
      />
      <Stars
        count={props.reducedMotion ? 2200 : 4600}
        depth={120}
        factor={props.reducedMotion ? 4.8 : 7.2}
        fade
        radius={220}
        saturation={0}
        speed={props.reducedMotion ? 0.16 : 0.3}
      />
      <NebulaClouds {...props} />
      <OrbitingBodies {...props} />
      <CometField {...props} />
      <ShootingStars {...props} />
      <VortexField
        color="#d8ecff"
        count={props.reducedMotion ? 1200 : 2200}
        radiusMax={20.5}
        radiusMin={7.4}
        progress={props.progress}
        reducedMotion={props.reducedMotion}
        size={props.reducedMotion ? 0.024 : 0.032}
        opacity={props.isDark ? 0.13 : 0.08}
        speedBase={props.reducedMotion ? 0.06 : 0.1}
        verticalSpread={0.84}
        pullStrength={0.82}
        driftX={-0.6}
        tiltX={0.08}
      />
      <VortexField
        color="#b9e4ff"
        count={props.reducedMotion ? 1200 : 2200}
        radiusMax={14.2}
        radiusMin={1.2}
        progress={props.progress}
        reducedMotion={props.reducedMotion}
        size={props.reducedMotion ? 0.02 : 0.028}
        opacity={props.isDark ? 0.26 : 0.14}
        speedBase={props.reducedMotion ? 0.16 : 0.26}
        verticalSpread={0.7}
        pullStrength={0.44}
        driftX={-0.22}
        tiltX={0.16}
      />
      <VortexField
        color="#8dd8ff"
        count={props.reducedMotion ? 900 : 1700}
        radiusMax={10.2}
        radiusMin={0.7}
        progress={props.progress}
        reducedMotion={props.reducedMotion}
        size={props.reducedMotion ? 0.016 : 0.022}
        opacity={props.isDark ? 0.18 : 0.1}
        speedBase={props.reducedMotion ? 0.24 : 0.36}
        verticalSpread={0.6}
        pullStrength={0.34}
        driftX={0.12}
        tiltX={0.24}
      />
      <VortexField
        color="#9272ff"
        count={props.reducedMotion ? 550 : 900}
        radiusMax={17.4}
        radiusMin={2.4}
        progress={props.progress}
        reducedMotion={props.reducedMotion}
        size={props.reducedMotion ? 0.026 : 0.036}
        opacity={props.isDark ? 0.12 : 0.06}
        speedBase={props.reducedMotion ? 0.08 : 0.14}
        verticalSpread={0.9}
        pullStrength={0.86}
        driftX={0.44}
        tiltX={0.04}
      />
      <Singularity {...props} />
      <CameraRig {...props} />
    </>
  );
}

export function BlackHoleScene({
  isDark,
  liteMode,
  progress,
  reducedMotion,
}: BlackHoleSceneProps) {
  const sceneStyle = {
    ["--sc-singularity-progress" as string]: progress.toFixed(3),
    ["--sc-singularity-scale" as string]: (1 + progress * 1.18).toFixed(3),
    ["--sc-singularity-haze" as string]: (0.12 + progress * 0.22).toFixed(3),
  };

  return (
    <div
      aria-hidden
      className={`sc-space-scene ${isDark ? "is-dark" : "is-light"} ${liteMode ? "is-lite-mode" : ""} ${reducedMotion ? "is-reduced-motion" : ""}`}
      style={sceneStyle}
    >
      {!liteMode ? (
        <Canvas
          camera={{ fov: 50, position: [0.95, 0.45, 13.6] }}
          dpr={[1, 1.6]}
          gl={{ alpha: true, antialias: true }}
        >
          <SceneRoot
            isDark={isDark}
            progress={progress}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      ) : null}
      <div className="sc-space-scene-overlay">
        <div className="sc-space-nebula sc-space-nebula--violet" />
        <div className="sc-space-nebula sc-space-nebula--cyan" />
        <div className="sc-space-nebula sc-space-nebula--gold" />
        <div className="sc-space-nebula sc-space-nebula--rose" />
        <div className="sc-singularity-aura" />
        <div className="sc-space-funnel-glow" />
        <div className="sc-black-hole-core" />
      </div>
    </div>
  );
}
