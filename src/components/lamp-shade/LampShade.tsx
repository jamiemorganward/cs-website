'use client'
import React, { useEffect, useRef } from 'react'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'

import { MeshWobbleMaterial } from '@react-three/drei'
import { DoubleSide, MathUtils, Vector2 } from 'three'

interface LampShadeProps {
  children?: React.ReactNode
}

const row1 = [
  { z: -25, x: 0 },
  { z: -24.1481, x: 6.47048 },
  { z: -21.65064, x: 12.5 },
  { z: -17.6776, x: 17.6776 },
  { z: -12.5, x: 21.65064 },
  { z: -6.47048, x: 24.1481 },
  { z: 0, x: 25 },
  { z: 6.47048, x: 24.1481 },
  { z: 12.5, x: 21.65064 },
  { z: 17.6776, x: 17.6776 },
  { z: 21.65064, x: 12.5 },
  { z: 24.1481, x: 6.47048 },
  { z: 25, x: 0 },
  { z: 24.1481, x: -6.47048 },
  { z: 21.65064, x: -12.5 },
  { z: 17.6776, x: -17.6776 },
  { z: 12.5, x: -21.65064 },
  { z: 6.47048, x: -24.1481 },
  { z: 0, x: -25 },
  { z: -6.47048, x: -24.1481 },
  { z: -12.5, x: -21.65064 },
  { z: -17.6776, x: -17.6776 },
  { z: -21.65064, x: -12.5 },
  { z: -24.1481, x: -6.47048 }
]

type BoxProps = ThreeElements['mesh'] & {
  position: [number, number, number]
}

function Box(props: BoxProps) {
  const ref = useRef<any>(null!)

  const height = 8 + 5 * Math.random()

  if (!props.position) {
    return <></>
  }

  const pos = props.position

  const yPos = height * 0.5 + 0.5

  pos[1] = props.position[1] > 0 ? yPos : -yPos

  // useFrame(() => {
  //   ref.current.distort = MathUtils.lerp(ref.current.distort, 0.4, 0.3)
  // })

  return (
    <mesh {...props} position={pos}>
      <planeGeometry args={[12, height, 32, 32]} />
      <meshBasicMaterial color={0xffffff} side={DoubleSide} />
      {/* <MeshWobbleMaterial
        ref={ref}
        speed={5}
        color={0xffffff}
        factor={0}
        normalScale={new Vector2(16, 16)}
      /> */}
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
        mass: 5,
        friction: 35,
        tension: 350,
        decay: true
      }
    },
    []
  )

  // const runSprings = useCallback(
  //   (y: number, dy: number, vxvy: number) => {
  //     const x = 0 // for now
  //     api.start((i) => {
  //       return {
  //         rotationY: y
  //         // immediate: true,
  //         // velocity: vxvy
  //       }
  //     })
  //   },
  //   [api]
  // )

  useFrame((state) => {
    state.camera.rotation.z = 0.1
    state.camera.rotation.x = 0
    state.camera.rotation.y = springs.rotationY.get()
  })

  // useWheel(
  //   (props) => {
  //     console.log(props)
  //     const {
  //       event,
  //       offset: [, y],
  //       direction: [, dy]
  //     } = props
  //     // event.preventDefault()
  //     if (dy) {
  //       wheelOffset.current = y * 0.001
  //       runSprings(dragOffset.current + y * 0.001, y, 0)
  //     }

  //     // api.start({
  //     //   rotationY: y
  //     // })
  //   },
  //   { target: window }
  // )
  useDrag(
    ({ active, offset: [x, y] }) => {
      // event.preventDefault()
      if (x) {
        dragOffset.current = x * 0.001
        // console.log(wheelOffset.current)
        api.set({ rotationY: x * 0.001 })
        console.log(x)
        // runSprings(wheelOffset.current + x * 0.001, x, 0)
      }

      // api.start({
      //   rotationY: y
      // })
    },
    { target: window }
  )

  // const handleWheel = (event: WheelEvent) => {
  //   setRotationY((current) => {
  //     return (
  //       current +
  //       (event.deltaY > 0 || event.deltaX > 0
  //         ? Math.max(event.deltaY, event.deltaX)
  //         : Math.min(event.deltaY, event.deltaX)) *
  //         -0.001
  //     )
  //   })
  // }

  useEffect(() => {
    three.camera.position.z = 0
    three.camera.rotation.order = 'YXZ'

    // window.addEventListener('wheel', handleWheel)

    return () => {
      // window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return <></>
}

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
        {row1.map((item, i) => (
          <Box
            position={[item.x * 2, 4.5, item.z * 2]}
            key={i}
            rotation={[0, i * -0.261799, 0]}
          />
        ))}
        {row1.map((item, i) => (
          <Box
            position={[item.x * 2, -4.5, item.z * 2]}
            key={i}
            rotation={[0, i * -0.261799, 0]}
          />
        ))}
      </Canvas>
    </div>
  )
}
