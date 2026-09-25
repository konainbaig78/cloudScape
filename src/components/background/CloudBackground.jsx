import { useMemo, useRef } from 'react'
import {
  Canvas,
  useFrame,
} from '@react-three/fiber'
import { Line } from '@react-three/drei'

const PARTICLE_COUNT = 90

function NetworkParticles() {
  const groupRef = useRef()

  const { positions, connections } =
    useMemo(() => {
      const generatedPositions = []
      const generatedConnections = []

      for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
      ) {
        generatedPositions.push(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 7
        )
      }

      for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
      ) {
        for (
          let j = i + 1;
          j < PARTICLE_COUNT;
          j++
        ) {
          const ax =
            generatedPositions[i * 3]

          const ay =
            generatedPositions[
              i * 3 + 1
            ]

          const az =
            generatedPositions[
              i * 3 + 2
            ]

          const bx =
            generatedPositions[j * 3]

          const by =
            generatedPositions[
              j * 3 + 1
            ]

          const bz =
            generatedPositions[
              j * 3 + 2
            ]

          const distance = Math.sqrt(
            (ax - bx) ** 2 +
              (ay - by) ** 2 +
              (az - bz) ** 2
          )

          if (
            distance < 2.8 &&
            generatedConnections.length < 80
          ) {
            generatedConnections.push([
              [ax, ay, az],
              [bx, by, bz],
            ])
          }
        }
      }

      return {
        positions: new Float32Array(
          generatedPositions
        ),
        connections:
          generatedConnections,
      }
    }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y +=
      delta * 0.012

    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.15
      ) * 0.02
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#a78bfa"
          size={0.055}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {connections.map(
        (connection, index) => (
          <Line
            key={index}
            points={connection}
            color="#7c5cff"
            transparent
            opacity={0.18}
            lineWidth={0.7}
          />
        )
      )}
    </group>
  )
}

function FloatingOrb({
  position,
  size,
  color,
  speed,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) {
      return
    }

    const time =
      state.clock.elapsedTime

    ref.current.position.y =
      position[1] +
      Math.sin(time * speed) * 0.35

    ref.current.position.x =
      position[0] +
      Math.cos(
        time * speed * 0.7
      ) *
        0.2
  })

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[
          size,
          24,
          24,
        ]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.07}
        depthWrite={false}
      />
    </mesh>
  )
}

function BackgroundScene() {
  return (
    <>
      <NetworkParticles />

      <FloatingOrb
        position={[-5, 2.5, -3]}
        size={2.5}
        color="#7c5cff"
        speed={0.25}
      />

      <FloatingOrb
        position={[5, -2, -4]}
        size={3}
        color="#35c7ff"
        speed={0.18}
      />

      <FloatingOrb
        position={[0, 4, -5]}
        size={2}
        color="#6ee7b7"
        speed={0.22}
      />
    </>
  )
}

export default function CloudBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 55,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <BackgroundScene />
      </Canvas>

      <div className="absolute inset-0 bg-[#070a12]/25" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.05] blur-[120px]" />
    </div>
  )
}