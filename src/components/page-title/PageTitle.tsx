'use client'
import { useRef, useState } from 'react'
import s from './PageTitle.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from '@/utils/useWindowSize'

export const PageTitle = ({
  title,
  dark,
  animate = true
}: {
  title: string
  dark?: boolean
  animate?: boolean
}) => {
  const titleRef = useRef<HTMLDivElement | null>(null)
  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (windowSize.width && windowSize.width < 991) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [windowSize.width])

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    if (animate && !isMobile) {
      const tl = gsap.timeline()

      tl.to(titleRef.current, { filter: 'blur(25px)', zIndex: 0 }, '0.1')
      tl.to(titleRef.current, { opacity: 0 }, '>-0.25')

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 0,
        end: '+=500',
        animation: tl,
        scrub: true,
        pin: titleRef.current,
        pinSpacing: false
      })
    }
  }, [isMobile])
  return (
    <div className={s.pageTitleWrapper} ref={titleRef}>
      <h1 className={s.pageTitle}>{title}</h1>
    </div>
  )
}
