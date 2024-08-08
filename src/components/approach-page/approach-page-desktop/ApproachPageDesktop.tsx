'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './ApproachPageDesktop.module.scss'
import Lottie from 'react-lottie'
import { PageTitle } from '../../page-title/PageTitle'
import { Card } from '../../card/Card'
import Function from '@/lottie-files/function.json'
import Fun from '@/lottie-files/fun.json'
import Form from '@/lottie-files/form.json'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { ApproachPageQuery } from '@/graphql/generated/graphql'

export const ApproachPageDesktop = ({
  data
}: {
  data: ApproachPageQuery['approachPage']
}) => {
  gsap.registerPlugin(ScrollTrigger)

  const pageRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const blurbRef = useRef<HTMLDivElement | null>(null)
  const cardOne = useRef<HTMLDivElement | null>(null)
  const cardTwo = useRef<HTMLDivElement | null>(null)
  const cardThree = useRef<HTMLDivElement | null>(null)
  const allCards = useRef<HTMLDivElement | null>(null)
  const postProRef = useRef<HTMLDivElement | null>(null)
  const [isTop, setIsTop] = useState(false)

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
    tl.to(blurbRef.current, {
      filter: 'blur(12px)',
      opacity: 0
    })

    tl.to(textRef.current, { filter: 'blur(12px)' }, '>-0.25')
    tl.to(
      allCards.current,
      {
        yPercent: -80
      },
      '>-0.25'
    )
    tl.to(
      allCards.current,
      {
        yPercent: -80
      },
      '>-1'
    )

    tl.to(cardTwo.current, { rotate: 10, translateX: '15px' }, '>-0.25')
    tl.to(cardThree.current, { rotate: -10, translateX: '-15px' }, '>-0.5')
    tl.to(cardOne.current, { scale: 1.1 }, '>-0.5')
    tl.to(
      cardOne.current,
      {
        yPercent: -200,
        xPercent: 500,
        rotate: 78,
        duration: 2
      },
      '<+=1'
    )
    tl.to(cardTwo.current, { rotate: 0, scale: 1.1 }, '>-2')
    tl.to(
      cardTwo.current,
      {
        yPercent: -200,
        xPercent: -500,
        rotate: 270,
        duration: 2
      },
      '<+=1'
    )
    tl.to(cardThree.current, { rotate: 0, scale: 1.1 }, '>-2')
    tl.to(
      cardThree.current,
      {
        yPercent: -350,
        xPercent: 500,
        rotate: 170,
        duration: 2
      },
      '<+=1'
    )
    tl.to(textRef.current, { filter: 'blur(0px)' }, '<')

    ScrollTrigger.create({
      trigger: blurbRef.current,
      animation: tl,
      start: 'top top',
      end: '+=6000',
      scrub: 0,
      pin: allCards.current,
      pinSpacing: false
    })
  }, [])

  useEffect(() => {
    const elementWatcher = (e: Event) => {
      if (
        postProRef.current &&
        postProRef.current?.getBoundingClientRect().top <= 0
      ) {
        setIsTop(true)
      } else {
        setIsTop(false)
      }
    }
    window.addEventListener('scroll', elementWatcher)

    return () => {
      window.removeEventListener('scroll', elementWatcher)
    }
  }, [])

  return (
    <div className={s.approachPage} ref={pageRef}>
      <div className={s.titleWrapper} ref={textRef}>
        <PageTitle title="Approach" animate={false} />
      </div>
      <div className={s.blurb} ref={blurbRef}>
        <h1 className={s.blurbText}>{data?.blurb}</h1>
      </div>
      <div className={s.cardWrapper} ref={allCards}>
        {data?.fffCards.map((card, i) => {
          return (
            <div
              className={`${
                card.title === 'Form'
                  ? s.cardOneWrapper
                  : card.title === 'Fun'
                  ? s.cardTwoWrapper
                  : s.cardThreeWrapper
              }`}
              ref={
                card.title === 'Form'
                  ? cardOne
                  : card.title === 'Fun'
                  ? cardTwo
                  : cardThree
              }
              key={i}
            >
              <Card approach card={card}>
                <Lottie
                  options={
                    card.title === 'Form'
                      ? formOptions
                      : card.title === 'Fun'
                      ? funOptions
                      : functionOptions
                  }
                />
              </Card>
            </div>
          )
        })}
      </div>
      <div className={s.spacer}></div>
      <div className={s.spacerReveal}></div>
      <div
        className={s.postProjectWrapper}
        ref={postProRef}
        style={{ backgroundAttachment: isTop ? 'initial' : 'fixed' }}
      >
        <div className={s.postProjectCards}>
          {data?.postProjectCards.map((card, i) => {
            return <Card key={i} card={card}></Card>
          })}
        </div>
      </div>
    </div>
  )
}
