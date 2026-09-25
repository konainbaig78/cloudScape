import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Float,
  Html,
  Stars,
} from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'

/* =========================================================
   DEFAULT CLOUD ARCHITECTURE
   ========================================================= */

const defaultNodes = [
  {
    id: 'lb',
    name: 'Load Balancer',
    shortName: 'Load Balancer',
    type: 'Gateway',
    status: 'Healthy',
    cpu: 23,
    memory: 41,
    requests: 1247,
    position: [0, 1.2, 0],
    color: '#7c5cff',
    description:
      'Distributes incoming traffic across multiple application servers.',
  },

  {
    id: 'api1',
    name: 'API Server 01',
    shortName: 'API 01',
    type: 'Compute',
    status: 'Healthy',
    cpu: 47,
    memory: 62,
    requests: 621,
    position: [-3, -0.5, 0],
    color: '#35c7ff',
    description:
      'Handles application requests and processes business logic.',
  },

  {
    id: 'api2',
    name: 'API Server 02',
    shortName: 'API 02',
    type: 'Compute',
    status: 'Healthy',
    cpu: 31,
    memory: 54,
    requests: 626,
    position: [3, -0.5, 0],
    color: '#35c7ff',
    description:
      'Provides additional compute capacity for incoming requests.',
  },

  {
    id: 'db',
    name: 'Primary Database',
    shortName: 'Database',
    type: 'Database',
    status: 'Healthy',
    cpu: 36,
    memory: 71,
    requests: 842,
    position: [0, -2.5, 0],
    color: '#6ee7b7',
    description:
      'Stores and retrieves persistent application data.',
  },
]

/* =========================================================
   DEFAULT CONNECTIONS
   ========================================================= */

const defaultConnections = [
  {
    from: 'lb',
    to: 'api1',
    trafficColor: '#b8a7ff',
    speed: 0.32,
  },

  {
    from: 'lb',
    to: 'api2',
    trafficColor: '#62d9ff',
    speed: 0.27,
  },

  {
    from: 'api1',
    to: 'db',
    trafficColor: '#75f0c0',
    speed: 0.21,
  },

  {
    from: 'api2',
    to: 'db',
    trafficColor: '#75f0c0',
    speed: 0.25,
  },
]

/* =========================================================
   EDGE
   ========================================================= */

function Edge({ a, b, active = false }) {
  const positions = useMemo(
    () =>
      new Float32Array([
        ...a.position,
        ...b.position,
      ]),
    [a.position, b.position]
  )

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color={
          active
            ? '#a78bfa'
            : '#26324d'
        }
        transparent
        opacity={
          active
            ? 0.95
            : 0.55
        }
      />
    </line>
  )
}

/* =========================================================
   TRAFFIC PARTICLE
   ========================================================= */

function Traffic({
  from,
  to,
  color = '#b8a7ff',
  speed = 0.22,
}) {
  const ref = useRef()

  const progress = useRef(
    Math.random()
  )

  useFrame((_, delta) => {
    if (!ref.current) return

    progress.current =
      (progress.current +
        delta * speed) %
      1

    const p = progress.current

    ref.current.position.x =
      from[0] +
      (to[0] - from[0]) * p

    ref.current.position.y =
      from[1] +
      (to[1] - from[1]) * p

    ref.current.position.z =
      from[2] +
      (to[2] - from[2]) * p
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry
        args={[0.075, 12, 12]}
      />

      <meshBasicMaterial
        color={color}
      />
    </mesh>
  )
}

/* =========================================================
   CLOUD NODE
   ========================================================= */

function CloudNode({
  node,
  selected,
  onSelect,
  showLabels = true,
}) {
  const ref = useRef()

  const [hovered, setHovered] =
    useState(false)

  useFrame((_, delta) => {
    if (!ref.current) return

    const target =
      selected || hovered
        ? 1.18
        : 1

    const smoothing = Math.min(
      delta * 10,
      1
    )

    ref.current.scale.x +=
      (target -
        ref.current.scale.x) *
      smoothing

    ref.current.scale.y +=
      (target -
        ref.current.scale.y) *
      smoothing

    ref.current.scale.z +=
      (target -
        ref.current.scale.z) *
      smoothing

    ref.current.rotation.y +=
      delta * 0.18
  })

  return (
    <group position={node.position}>
      <Float
        speed={1.2}
        rotationIntensity={0.18}
        floatIntensity={0.28}
      >
        <mesh
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()

            if (onSelect) {
              onSelect(node)
            }
          }}
          onPointerOver={() =>
            setHovered(true)
          }
          onPointerOut={() =>
            setHovered(false)
          }
        >
          <icosahedronGeometry
            args={[0.72, 1]}
          />

          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={
              selected
                ? 0.42
                : hovered
                ? 0.25
                : 0.1
            }
            roughness={0.28}
            metalness={0.6}
          />
        </mesh>

        {showLabels && (
          <Html
            center
            distanceFactor={8}
            style={{
              pointerEvents: 'none',
            }}
          >
            <div
              className={`node-label ${
                selected
                  ? 'selected'
                  : ''
              }`}
            >
              <span className="node-dot" />

              {node.shortName ||
                node.name}
            </div>
          </Html>
        )}
      </Float>
    </group>
  )
}

/* =========================================================
   SCENE CONTENT
   ========================================================= */

function SceneContent({
  nodes,
  connections,
  selected,
  onSelect,
  showTraffic,
  showLabels,
}) {
  return (
    <>
      {/* Background */}
      <color
        attach="background"
        args={['#070a12']}
      />

      <fog
        attach="fog"
        args={[
          '#070a12',
          8,
          22,
        ]}
      />

      {/* Lighting */}
      <ambientLight
        intensity={1.1}
      />

      <pointLight
        position={[0, 5, 4]}
        intensity={18}
        color="#8b7cff"
        distance={15}
      />

      <pointLight
        position={[-5, -2, 2]}
        intensity={9}
        color="#25b8ff"
        distance={12}
      />

      {/* Background stars */}
      <Stars
        radius={35}
        depth={20}
        count={1400}
        factor={1.5}
        saturation={0}
        fade
        speed={0.4}
      />

      {/* Connections */}
      {connections.map(
        (connection, index) => {
          const fromNode =
            nodes.find(
              (node) =>
                node.id ===
                connection.from
            )

          const toNode =
            nodes.find(
              (node) =>
                node.id ===
                connection.to
            )

          if (
            !fromNode ||
            !toNode
          ) {
            return null
          }

          const active =
            selected?.id ===
              fromNode.id ||
            selected?.id ===
              toNode.id

          return (
            <Edge
              key={`edge-${index}`}
              a={fromNode}
              b={toNode}
              active={active}
            />
          )
        }
      )}

      {/* Animated traffic */}
      {showTraffic &&
        connections.map(
          (connection, index) => {
            const fromNode =
              nodes.find(
                (node) =>
                  node.id ===
                  connection.from
              )

            const toNode =
              nodes.find(
                (node) =>
                  node.id ===
                  connection.to
              )

            if (
              !fromNode ||
              !toNode
            ) {
              return null
            }

            return (
              <Traffic
                key={`traffic-${index}`}
                from={fromNode.position}
                to={toNode.position}
                speed={
                  connection.speed ??
                  0.22
                }
                color={
                  connection.trafficColor ??
                  '#b8a7ff'
                }
              />
            )
          }
        )}

      {/* Cloud components */}
      {nodes.map((node) => (
        <CloudNode
          key={node.id}
          node={node}
          selected={
            selected?.id ===
            node.id
          }
          onSelect={onSelect}
          showLabels={showLabels}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={13}
      />
    </>
  )
}

/* =========================================================
   CLOUD SCENE
   ========================================================= */

export default function CloudScene({
  nodes = defaultNodes,
  connections = defaultConnections,
  selected = null,
  onSelect = () => {},
  onMissed = () => {},
  showTraffic = true,
  showLabels = true,
  cameraPosition = [
    0,
    2.8,
    9,
  ],
  fov = 52,
}) {
  return (
    <Canvas
      camera={{
        position: cameraPosition,
        fov,
      }}
      onPointerMissed={onMissed}
    >
      <SceneContent
        nodes={nodes}
        connections={connections}
        selected={selected}
        onSelect={onSelect}
        showTraffic={showTraffic}
        showLabels={showLabels}
      />
    </Canvas>
  )
}

/* =========================================================
   EXPORT DEFAULT DATA
   ========================================================= */

export {
  defaultNodes,
  defaultConnections,
}