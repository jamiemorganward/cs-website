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

interface LampShadeProps {
  children?: React.ReactNode
}

const row1 = [
  { x: 86.33, z: 45, long: true, image: 'RNZB.jpg' },
  // { x: 9.57, z: 23.1 },
  null,
  // { x: 17.68, z: 17.68 },
  null,
  { x: 23.1, z: 9.57, image: 'Junior.jpg' },
  { x: 25.0, z: 0.0, tall: true, image: 'bullet.jpg' },
  { x: 23.1, z: -9.57, image: 'map-table.jpg' },
  // { x: 17.68, z: -17.68 },
  null,
  { x: 9.57, z: -23.1, image: 'SOD.jpg' },
  // loopdy loop around
  { x: 0, z: -25, long: true, image: 'RNZB.jpg' },
  // { x: -9.57, z: -23.1 },
  null,
  // { x: -17.68, z: -17.68 },
  null,
  { x: -23.1, z: -9.57, image: 'Junior.jpg' },
  { x: -25, z: 0, tall: true, image: 'bullet.jpg' },
  { x: -23.1, z: 9.57, image: 'map-table.jpg' },
  // { x: -17.68, z: 17.68 },
  null,
  { x: -9.57, z: 23.1, image: 'SOD.jpg' },
  null,
  null
  // { x: 0, z: 25 },
  // { x: 0, z: 0 }
]

const row2 = [
  { x: 86.33, z: 45, image: 'he-tohu.jpg' },
  // { x: 9.57, z: 23.1 },
  null,
  { x: 17.68, z: 17.68, image: 'Fireflies.jpg' },
  // { x: 23.1, z: 9.57 },
  null,
  // { x: 25, z: 0 },
  null,
  // { x: 23.1, z: -9.57 },
  null,
  { x: 17.68, z: -17.68, long: true, image: 'Eels.jpg' },
  // { x: 9.57, z: -23.1 },
  null,
  // loopdy loop
  { x: 0, z: -25, image: 'he-tohu.jpg' },
  // { x: -9.57, z: -23.1 },
  null,
  { x: -17.68, z: -17.68, image: 'Fireflies.jpg' },
  // { x: -23.1, z: -9.57 },
  null,
  // { x: -25, z: 0 },
  null,
  // { x: -23.1, z: 9.57 },
  null,
  { x: -17.68, z: 17.68, long: true, image: 'Eels.jpg' },
  // { x: -9.57, z: 23.1 },
  null,
  null,
  null
  // { x: 0, z: 25 },
  // { x: 0, z: 0 }
]

// console.log(
//   [...new Set(row2.map((s) => JSON.stringify(s)))].map((e) => JSON.parse(e))
// )

type BoxProps = ThreeElements['mesh'] & {
  position: [number, number, number]
  long?: boolean
  image: string
  tall?: boolean
}

function Box(props: BoxProps) {
  const image = useLoader(TextureLoader, props.image)
  const height = 13

  if (!props.position) {
    return <></>
  }

  const pos = props.position

  const yPos = height * 0.5 + 1.3 + (props.tall ? -8 : 0)

  pos[1] = props.position[1] > 0 ? yPos : -yPos

  const colorMap = image

  return (
    <mesh {...props} position={pos}>
      {/* <planeGeometry args={[23, height, 32, 32]} /> */}
      <cylinderGeometry
        args={[
          50,
          50,
          height + (props.tall ? 16 : 0),
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
      1 - 100 * (Math.abs(springs.rotationY.velocity) / 1.6),
      0.4
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
                position={[0 * 2, 4.5, 0]}
                key={i}
                long={item.long}
                tall={item.tall}
                image={item.image}
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
                image={item.image}
                long={item.long}
                // tall={item.tall}
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
      </Canvas>
    </div>
  )
}
