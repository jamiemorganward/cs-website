import React, { useEffect, useRef, useState } from 'react'
import s from './ApproachPageMobile.module.scss'
import { Card } from '@/components/card/Card'
import Lottie from 'react-lottie'
import Function from '@/lottie-files/function.json'
import Fun from '@/lottie-files/fun.json'
import Form from '@/lottie-files/form.json'
import { PageTitle } from '@/components/page-title/PageTitle'
import { useWindowSize } from '@/utils/useWindowSize'
import { ApproachPageQuery } from '@/graphql/generated/graphql'
import MobileProcessText from '@/assets/svgs/our-process-text/our-process-small.svg'

export const ApproachPageMobile = ({
  data
}: {
  data: ApproachPageQuery['approachPage']
}) => {
  const postProRef = useRef<HTMLDivElement | null>(null)
  const [isTop, setIsTop] = useState(false)
  const windowSize = useWindowSize()

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

  if (!windowSize.width) return <></>

  return (
    <div className={s.approachPageMobileWrapper}>
      <div className={s.headerWrapper}>
        <PageTitle title="Approach" />
      </div>
      <div className={s.blurbSection}>
        <h1 className={s.blurb}>{data?.blurb}</h1>
      </div>
      <div className={s.cardWrapper}>
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
              key={i}
            >
              <Card card={card}>
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
      <div
        className={s.postProjectWrapper}
        ref={postProRef}
        style={{
          backgroundAttachment: isTop ? 'initial' : 'fixed',
          backgroundPositionY:
            windowSize.width < 478
              ? '5.7rem'
              : windowSize.width > 600
              ? '7.5rem'
              : '6.75rem'
        }}
      >
        {windowSize.width <= 600 && (
          <div className={s.mobileProcessText}>
            <MobileProcessText />
          </div>
        )}
        <div className={s.postProjectCards}>
          {data?.postProjectCards.map((card, i) => {
            return <Card key={i} card={card}></Card>
          })}
        </div>
      </div>
    </div>
  )
}
