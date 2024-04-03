'use client'
import { useGSAP } from '@gsap/react'
import s from './PageTitle.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

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

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    if (animate) {
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
  }, [])
  return (
    <div className={s.pageTitleWrapper} ref={titleRef}>
      <h1 className={s.pageTitle}>{title}</h1>
    </div>
  )
}
