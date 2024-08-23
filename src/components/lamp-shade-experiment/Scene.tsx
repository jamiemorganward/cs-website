import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Model } from './Model'
import { LampShadeCamera } from '../lamp-shade/LampShade'

interface SceneProps {
  children?: React.ReactNode
}

export const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas>
      <LampShadeCamera />
      <Model />
    </Canvas>
  )
}
