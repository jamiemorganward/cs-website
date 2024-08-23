'use client'
import React from 'react'
import s from './LampShadeExperiment.module.scss'
import dynamic from 'next/dynamic'

interface LampShadeExperimentProps {
  children?: React.ReactNode
}

const Scene = dynamic(async () => (await import('./Scene')).Scene, {
  ssr: false
})

export const LampShadeExperiment = ({ children }: LampShadeExperimentProps) => {
  return (
    <div className={s.lampShadeExperiment}>
      <Scene />
    </div>
  )
}
