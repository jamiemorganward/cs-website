'use client'
import React, { useRef } from 'react'
import s from './ApproachPage.module.scss'
import Lottie from 'react-lottie'
import { PageTitle } from '../page-title/PageTitle'
import { Card } from '../card/Card'
import Function from '@/lottie-files/function.json'
import Fun from '@/lottie-files/fun.json'
import Form from '@/lottie-files/form.json'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

export const ApproachPage = () => {
  gsap.registerPlugin(ScrollTrigger)
  const cardOne = useRef<HTMLDivElement | null>(null)
  const cardTwo = useRef<HTMLDivElement | null>(null)
  const cardThree = useRef<HTMLDivElement | null>(null)
  const allCards = useRef<HTMLDivElement | null>(null)

  const functionOptions = {
    loop: true,
    autoplay: true,
    animationData: Function,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const formOptions = {
    loop: true,
    autoplay: true,
    animationData: Form,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const funOptions = {
    loop: true,
    autoplay: true,
    animationData: Fun,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(allCards.current, { yPercent: -20 })
    tl.to(cardTwo.current, { rotate: 20, translateX: -20, scale: 0.8 }, '>-0.5')
    tl.to(
      cardThree.current,
      { rotate: -20, translateX: 20, scale: 0.8 },
      '>-0.5'
    )
    tl.to(cardOne.current, { scale: 1.1 }, '>-0.5')
    tl.to(cardOne.current, { yPercent: -200, xPercent: -500, rotate: 78 })
    tl.to(cardTwo.current, { rotate: 0, scale: 1.1 }, '>+0.5')
    tl.to(cardTwo.current, { yPercent: -200, xPercent: 500, rotate: 360 })
    tl.to(cardThree.current, { rotate: 0, scale: 1.1 }, '>+0.5')

    ScrollTrigger.create({
      animation: tl,
      start: 'top top',
      end: 'bottom bottom',
      markers: true,
      scrub: 1,
      pin: true
    })
  }, [])

  return (
    <div className={s.approachPage}>
      <PageTitle title="Approach" />
      <div className={s.cardWrapper} ref={allCards}>
        <div className={s.cardOneWrapper} ref={cardOne}>
          <Card
            title="Form"
            titleRight="01"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={functionOptions} />
          </Card>
        </div>
        <div className={s.cardTwoWrapper} ref={cardTwo}>
          <Card
            title="Fun"
            titleRight="02"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={funOptions} />
          </Card>
        </div>
        <div className={s.cardThreeWrapper} ref={cardThree}>
          <Card
            title="Function"
            titleRight="03"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={formOptions} />
          </Card>
        </div>
      </div>
    </div>
  )
}
