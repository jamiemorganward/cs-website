'use client'
import React, { ReactNode, useEffect, useRef } from 'react'
import s from './Parallax.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useWindowSize } from '@/utils/useWindowSize'
import { useGSAP } from '@gsap/react'

export const Parallax = ({
  children,
  className,
  speed = 1,
  id
}: {
  children: ReactNode
  className: string
  speed: number
  id: string
}) => {
  const trigger = useRef<HTMLDivElement | null>(null)
  const target = useRef<HTMLDivElement | null>(null)
  const timeline = useRef<GSAPTimeline | null>(null)

  const { width } = useWindowSize()

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!width || width < 767) return

    const y = width * speed * 0.1

    const setY = gsap.quickSetter(target.current, 'y', 'px')
    console.log('Reach')
    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (e) => {
          setY(e.progress * y)
        }
      }
    })

    return () => {
      timeline?.current?.kill()
    }
  }, [id, speed, width])

  return (
    <div className={s.wrapper} ref={trigger}>
      <div ref={target}>{children}</div>
    </div>
  )
}
