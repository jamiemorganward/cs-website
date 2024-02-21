'use client'
import React, {
  WheelEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import s from './LampShade.module.scss'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { Color, Euler, FogExp2, PerspectiveCamera, Vector3 } from 'three'
import { useScroll, useSpring } from '@react-spring/three'
import { useDrag, useWheel } from '@use-gesture/react'

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
  const ref = useRef<THREE.Mesh>(null!)

  const height = 8 + 5 * Math.random()

  if (!props.position) {
    return <></>
  }

  const pos = props.position

  const yPos = height * 0.5 + 0.5

  pos[1] = props.position[1] > 0 ? yPos : -yPos

  return (
    <mesh {...props} position={pos} ref={ref}>
      <boxGeometry args={[12, height]} />
      <meshStandardMaterial color={0xffffff} />
    </mesh>
  )
}

export const LampShadeCamera = () => {
  const three = useThree()

  const [rotationY, setRotationY] = useState(0)
  const wheelOffset = useRef(0)
  const dragOffset = useRef(0)

  const [springs, api] = useSpring(
    () => ({
      rotationY: 0,

      config: (key) => {
        switch (key) {
          case 'scale':
            return {
              mass: 4,
              friction: 10
            }
          case 'rotationY':
            return { mass: 1.3, friction: 35 }
          default:
            return {}
        }
      }
    }),
    []
  )

  const runSprings = useCallback(
    (y: number, dy: number) => {
      const x = 0 // for now
      api.start((i) => {
        return {
          rotationY: y,
          immediate: true
        }
      })
    },
    [api]
  )

  useFrame((state) => {
    state.camera.rotation.z = 0.1
    state.camera.rotation.x = 0
    state.camera.rotation.y = springs.rotationY.get()
  })

  useWheel(
    (props) => {
      console.log(props)
      const {
        event,
        offset: [, y],
        direction: [, dy]
      } = props
      // event.preventDefault()
      if (dy) {
        wheelOffset.current = y * 0.001
        runSprings(dragOffset.current + y * 0.001, y)
      }

      // api.start({
      //   rotationY: y
      // })
    },
    { target: window }
  )
  useDrag(
    (props) => {
      console.log(props)
      const {
        event,
        offset: [x],
        direction: [dx]
      } = props
      // event.preventDefault()
      if (dx) {
        dragOffset.current = x * 0.001
        console.log(wheelOffset.current)
        runSprings(wheelOffset.current + x * 0.001, x)
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
        {/* <Box position={[1.2, 0, 0]} /> */}
      </Canvas>
    </div>
  )
}
