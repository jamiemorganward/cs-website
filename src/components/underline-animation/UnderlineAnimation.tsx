'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import s from './UnderlineAnimation.module.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const UnderlineAnimation = ({ children }: { children: ReactNode }) => {
  const linkRef = useRef<HTMLButtonElement | null>(null)
  const lineRef = useRef<HTMLSpanElement | null>(null)

  gsap.registerPlugin(useGSAP)

  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5 } })
  let exitTime = 0

  useGSAP(() => {
    reset()
    tl.to(lineRef.current, { width: '100%' })
    tl.addPause('exit')
    exitTime = tl.duration()
    tl.to(lineRef.current, { x: '100%' })
  }, [{ lineRef, linkRef }])

  const reset = () => {
    gsap.set(lineRef.current, {
      width: '0%',
      transformOrigin: 'left center',
      x: 0
    })
  }

  const hoverIn = () => {
    if (tl.time() < exitTime) {
      reset()
      tl.play()
    } else {
      tl.restart()
    }
  }

  const hoverOut = () => {
    if (tl.time() < exitTime) {
      tl.reverse()
    } else {
      tl.play()
    }
  }

  return (
    <div className={s.wrapper} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
      {children}
      <span ref={lineRef} className={s.linkHoverLine}></span>
    </div>
  )
}
