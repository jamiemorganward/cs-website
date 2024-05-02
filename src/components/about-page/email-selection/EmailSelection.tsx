'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './EmailSelection.module.scss'
import Copied from '@/assets/svgs/cursors/copied.svg'
import gsap from 'gsap'
import { useWindowSize } from '@/utils/useWindowSize'

export const EmailSelection = () => {
  const [backgroundColour, setBackgroundColour] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const circleRef = useRef<HTMLDivElement | null>(null)
  const copiedRef = useRef<HTMLParagraphElement | null>(null)
  const mobileCopied = useRef<HTMLDivElement | null>(null)
  const [diameter, setDiameter] = useState<number>(0)
  const windowSize = useWindowSize()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

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

  const tl = gsap.timeline({ paused: true })
  tl.to(circleRef.current, { zIndex: 1 })
  tl.to(
    circleRef.current,
    {
      width: diameter,
      height: diameter,
      duration: 2,
      ease: 'circ.inOut'
    },
    '<'
  )
  tl.to(copiedRef.current, { opacity: 1, duration: 2 }, '<= .2')
  tl.to(mobileCopied.current, { opacity: 1, duration: 2 }, '<')

  const backItUp = () => {
    let colour = getABackground()
    setBackgroundColour(colour)
  }

  useEffect(() => {
    const vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    setDiameter(Math.sqrt(Math.pow(vw, 2) + Math.pow(vh, 2)))
    backItUp()
  }, [])

  useEffect(() => {
    if (windowSize.width && windowSize.height) {
      setDiameter(
        Math.sqrt(
          Math.pow(windowSize.width, 2) + Math.pow(windowSize.height, 2)
        )
      )
    }
  }, [windowSize])

  useEffect(() => {
    if (isCopied) {
      navigator.clipboard.writeText('hello@clicksuite.co.nz')
    }
  }, [isCopied])

  const onMove = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      const buttonWidth = cursorRef.current.offsetWidth
      const buttonHeight = cursorRef.current.offsetHeight
      const buttonX = mouseX - buttonWidth / 2
      const buttonY = mouseY - buttonHeight / 2

      const maxButtonX = containerRect.width - buttonWidth
      const maxButtonY = containerRect.height - buttonHeight

      const tl = gsap.timeline()

      tl.to(cursorRef.current, {
        duration: 0.1,
        overwrite: 'auto',
        x: Math.min(Math.max(buttonX, 0), maxButtonX),
        y: Math.min(Math.max(buttonY, 0), maxButtonY),
        // stagger: 0.1,
        ease: 'Power1.ease'
      })
      tl.to(cursorRef.current, { opacity: 1 }, '<.1')
    }
  }

  const onLeave = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      gsap.killTweensOf(cursorRef.current)
      const tl = gsap.timeline()
      tl.to(cursorRef.current, { opacity: 0, duration: 0.1 })
      tl.to(
        cursorRef.current,
        {
          duration: 0.5,
          x:
            (containerRef.current.clientWidth - cursorRef.current.clientWidth) /
            2,
          y:
            (containerRef.current.clientHeight -
              cursorRef.current.clientHeight) /
            2
        },
        '<1'
      )
    }
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container || !cursorRef.current) return

    gsap.set(cursorRef.current, {
      x: (container.clientWidth - cursorRef.current.clientWidth) / 2,
      y: (container.clientHeight - cursorRef.current.clientHeight) / 2
    })

    container?.addEventListener('mousemove', (e) => onMove(e))
    container?.addEventListener('mouseleave', (e) => onLeave(e))

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef, cursorRef])

  return (
    <div
      className={`${s.emailSelection} ${isCopied && s.copiedEmailSelection}`}
      onClick={() => setIsCopied(true)}
      onMouseDown={() => tl.play()}
      onMouseUp={() => tl.reverse()}
      ref={containerRef}
    >
      <div className={s.cursor} ref={cursorRef}>
        <p> {isCopied ? 'Copied!' : 'Hold To Copy'}</p>
      </div>
      <p className={s.email}>hello@clicksuite.co.nz</p>

      <div className={s.mobileCopied} ref={mobileCopied}>
        <Copied fill={backgroundColour} height="50" width="50" />
      </div>
      <div
        className={s.circle}
        ref={circleRef}
        style={{ backgroundColor: backgroundColour }}
        onClick={backItUp}
      >
        <p className={s.copied} ref={copiedRef}>
          Copied!
        </p>
      </div>
    </div>
  )
}
