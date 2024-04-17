'use client'
import React, { useEffect, useRef } from 'react'
import {
  Canvas,
  ThreeElements,
  useFrame,
  useLoader,
  useThree
} from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { useDrag, useWheel } from '@use-gesture/react'

import { DoubleSide, TextureLoader } from 'three'
import { color } from 'three/examples/jsm/nodes/Nodes.js'

interface LampShadeProps {
  children?: React.ReactNode
}

const row1 = [
  { x: 86.33, z: 45 },
  { x: 9.57, z: 23.1 },
  { x: 17.68, z: 17.68 },
  { x: 23.1, z: 9.57 },
  null,
  { x: 23.1, z: -9.57 },
  { x: 17.68, z: -17.68 },
  { x: 9.57, z: -23.1 },
  { x: 0, z: -25 },
  { x: -9.57, z: -23.1 },
  { x: -17.68, z: -17.68 },
  { x: -23.1, z: -9.57 },
  { x: -25, z: 0 },
  null,
  { x: -17.68, z: 17.68 },
  { x: -9.57, z: 23.1 },
  { x: 0, z: 25 },
  { x: 0, z: 0 }
]

const row2 = [
  { x: 86.33, z: 45 },
  { x: 9.57, z: 23.1 },
  null,
  { x: 23.1, z: 9.57 },
  { x: 25, z: 0 },
  { x: 23.1, z: -9.57 },
  { x: 17.68, z: -17.68 },
  { x: 9.57, z: -23.1 },
  { x: 0, z: -25 },
  { x: -9.57, z: -23.1 },
  { x: -17.68, z: -17.68, long: true },
  null,
  { x: -25, z: 0 },
  { x: -23.1, z: 9.57 },
  { x: -17.68, z: 17.68 },
  { x: -9.57, z: 23.1 },
  { x: 0, z: 25 },
  { x: 0, z: 0 }
]

// console.log(
//   [...new Set(row2.map((s) => JSON.stringify(s)))].map((e) => JSON.parse(e))
// )

type BoxProps = ThreeElements['mesh'] & {
  position: [number, number, number]
  long?: boolean
}

function Box(props: BoxProps) {
  const images = [
    useLoader(TextureLoader, '/JR-1.jpg'),
    useLoader(TextureLoader, '/JR.jpg'),
    useLoader(TextureLoader, '/RNZB.jpg'),
    useLoader(TextureLoader, '/ballet-2.jpg'),
    useLoader(TextureLoader, '/tp-1.jpg'),
    useLoader(
      TextureLoader,
      '/654039aa5525e7a663457076_Junior Films Wireframes.jpg'
    ),
    useLoader(TextureLoader, '/Evolve.jpg')
  ]
  const height = 10

  if (!props.position) {
    return <></>
  }

  const pos = props.position

  const yPos = height * 0.5 + 1.1

  pos[1] = props.position[1] > 0 ? yPos : -yPos

  const colorMap = images[Math.floor(Math.random() * images.length)]

  return (
    <mesh {...props} position={pos}>
      {/* <planeGeometry args={[23, height, 32, 32]} /> */}
      <cylinderGeometry
        args={[
          50,
          50,
          height,
          100,
          1,
          true,
          props.long ? -0.65 : -1,
          props.long ? -0.65 : -0.3
        ]}
      />

      <meshBasicMaterial map={colorMap} side={DoubleSide} />
    </mesh>
  )
}

export const LampShadeCamera = () => {
  const three = useThree()
  const wheelOffset = useRef(0)
  const dragOffset = useRef(0)

  const [springs, api] = useSpring(
    {
      rotationY: 0,

      config: {
        tension: 170,
        friction: 26,
        frequency: 1,
        damping: 1
      }
    },
    []
  )

  useFrame((state) => {
    state.camera.rotation.z = 0.1
    state.camera.rotation.x = 0
    state.camera.rotation.y = springs.rotationY.to((y) => y).get()

    state.camera.zoom = Math.max(
      1 - 100 * (Math.abs(springs.rotationY.velocity) / 2),
      0.6
    )

    state.camera.updateProjectionMatrix()
  })

  useWheel(
    (props) => {
      const {
        offset: [, y],
        direction: [, dy]
      } = props
      // event.preventDefault()
      if (dy) {
        wheelOffset.current = y * 0.001
        api.start({ rotationY: dragOffset.current + y * 0.001 })
        // runSprings(dragOffset.current + y * 0.001, y, 0)
      }

      // api.start({
      //   rotationY: y
      // })
    },
    { target: window }
  )
  useDrag(
    ({ active, offset: [x, y] }) => {
      if (x) {
        dragOffset.current = x * 0.001
        api.start({ rotationY: wheelOffset.current + x * 0.001 })
      }
    },
    { target: window }
  )

  useEffect(() => {
    three.camera.position.z = 0
    three.camera.rotation.order = 'YXZ'
  }, [])

  return <></>
}

const radians = (deg: number) => deg * (Math.PI / 180)

export const LampShade = ({ children }: LampShadeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        style={{ background: '#000000' }}
        camera={{ fov: 40 }}
        ref={canvasRef}
      >
        <LampShadeCamera />
        <axesHelper />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {row1.map((item, i) => {
          if (item !== null) {
            return (
              <Box
                position={[0 * 2, -4.5, 0]}
                key={i}
                rotation={[
                  0,
                  ((i + 1) * (360 / row2.length) * Math.PI) / 180,
                  0
                ]}
              />
            )
          }
          return <></>
        })}
        {row2.map((item, i) => {
          if (item !== null) {
            return (
              <Box
                long={item.long}
                position={[0 * 2, 4.5, 0]}
                key={i}
                rotation={[
                  0,
                  ((i + 1) * (360 / row2.length) * Math.PI) / 180,
                  0
                ]}
              />
            )
          }
          return <></>
        })}
      </Canvas>
    </div>
  )
}
