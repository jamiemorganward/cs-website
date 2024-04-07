import React, { forwardRef, useRef } from 'react'
import lerp from 'lerp'
import './CustomMaterial'
import { CustomMaterial } from './CustomMaterial'
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap
} from 'three'
import { useFrame } from '@react-three/fiber'

const Plane = forwardRef<
  Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >
>(
  (
    { color = 'white', shift = 1, opacity = 1, args, map, ...props }: any,
    ref
  ) => {
    // const { viewportHeight, offsetFactor } = useBlock()
    const { viewportHeight, offsetFactor } = {
      viewportHeight: 700,
      offsetFactor: 1
    }
    const material = useRef<CustomMaterial | null>(null)
    // let last = state.top.current
    useFrame(() => {
      if (!material.current) {
        return
      }
      // const { pages, top } = state
      material.current.scale = lerp(
        material.current?.scale,
        // offsetFactor - top.current / ((pages - 1) * viewportHeight),
        offsetFactor,
        0.1
      )
      material.current.shift = lerp(material.current.shift, 1 / shift, 0.1)
      // last = top.current
    })
    return (
      <mesh ref={ref} {...props}>
        <planeBufferGeometry attach="geometry" args={args} />
        <customMaterial
          ref={material}
          attach="material"
          color={color}
          map={map}
          transparent
          opacity={opacity}
        />
      </mesh>
    )
  }
)

Plane.displayName = 'Plane'

export default Plane
