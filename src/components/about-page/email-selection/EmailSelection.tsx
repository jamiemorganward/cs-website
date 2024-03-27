'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './EmailSelection.module.scss'
import LeftEye from '@/assets/svgs/left-eye.svg'
import RightEye from '@/assets/svgs/right-eye.svg'
import Copied from '@/assets/svgs/cursors/copied.svg'
import gsap from 'gsap'

export const EmailSelection = () => {
  const [backgroundColour, setBackgroundColour] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const circleRef = useRef<HTMLDivElement | null>(null)
  const copiedRef = useRef<HTMLParagraphElement | null>(null)
  const eyeRef = useRef<HTMLDivElement | null>(null)
  const mobileCopied = useRef<HTMLDivElement | null>(null)

  const getABackground = () => {
    const value = Math.floor(Math.random() * 3)
    switch (value) {
      case 0:
        return '#F60'
      case 1:
        return '#FFC10C'
      case 2:
        return '#9190FF'
      default:
        return '#F60'
    }
  }

  const animateIn = () => {
    const tl = gsap.timeline({ paused: true })
    tl.to(circleRef.current, { zIndex: 1 })
    tl.to(
      circleRef.current,
      {
        scale: 2000,
        duration: 1,
        ease: 'circ.inOut'
      },
      '<'
    )
    tl.to(copiedRef.current, { opacity: 1, duration: 1 }, '<= .2')
    tl.to(mobileCopied.current, { opacity: 1, duration: 1 }, '<')
    tl.to(eyeRef.current, { translateY: '-4rem' }, '<')

    if (circleRef.current && copiedRef.current) {
      tl.play()
    }
  }

  const backItUp = () => {
    let colour = getABackground()
    setBackgroundColour(colour)
  }

  useEffect(() => {
    backItUp()
  }, [])

  useEffect(() => {
    if (isCopied) {
      navigator.clipboard.writeText('hello@clicksuite.co.nz')
      animateIn()
    }
  }, [isCopied])

  return (
    <div className={s.emailSelection} onClick={() => setIsCopied(true)}>
      <p className={s.email}>hello@clicksuite.co.nz</p>
      <p className={s.copied} ref={copiedRef}>
        Copied!
      </p>
      <div className={s.mobileCopied} ref={mobileCopied}>
        <Copied fill={backgroundColour} height="50" width="50" />
      </div>
      <div
        className={s.circle}
        ref={circleRef}
        style={{ backgroundColor: backgroundColour }}
        onClick={backItUp}
      ></div>
      <div className={s.eyeWrapper} ref={eyeRef}>
        <LeftEye />
        <RightEye />
      </div>
    </div>
  )
}
