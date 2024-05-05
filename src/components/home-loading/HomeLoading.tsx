import React, { useEffect, useRef } from 'react'
import s from './HomeLoading.module.scss'
import gsap from 'gsap'
import Hearts from '@/assets/svgs/hearts.svg'

export const HomeLoading = ({ percentage }: { percentage: number }) => {
  const barRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const closeUp = () => {
    gsap.to(wrapperRef.current, {
      marginLeft: 'calc(100% - 75px)',
      duration: 1.5,
      delay: 0.5,
      ease: 'expo.inOut'
    })
  }

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { width: `${percentage}%` })
    }

    if (percentage === 100) {
      closeUp()
    }
  }, [percentage])

  return (
    <div className={s.loadingWrapper}>
      <div className={s.barWrapper} ref={wrapperRef}>
        <p className={s.number}>0</p>
        <div className={s.loadingBar} ref={barRef}></div>
        {percentage !== 0 && <p className={s.number}>{percentage}</p>}
      </div>
      <div className={s.content}>
        <h3 className={s.text}>
          We&apos;re A Creative Agency In The{' '}
          <span className={s.heartWrapper}>
            <Hearts />
          </span>{' '}
          Of P
          <span className={s.ooo}>
            o<div className={s.macron}></div>
          </span>
          neke Building Websites And Digital Installations, Since 1994.
        </h3>
      </div>
    </div>
  )
}
