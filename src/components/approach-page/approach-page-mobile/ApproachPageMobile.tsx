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
      <div className={s.cardWrapper}>
        <div className={s.cardOneWrapper}>
          <Card
            title="Form"
            titleRight="01"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={functionOptions} />
          </Card>
        </div>
        <div className={s.cardTwoWrapper}>
          <Card
            title="Fun"
            titleRight="02"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={funOptions} />
          </Card>
        </div>
        <div className={s.cardThreeWrapper}>
          <Card
            title="Function"
            titleRight="03"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <Lottie options={formOptions} />
          </Card>
        </div>
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
        // Saving for later if needed
        // isTop && windowSize.width > 600
        // ? '5.5rem'
        // : isTop && windowSize.width < 478
        // ? '2.85rem'
        // : isTop && windowSize.width < 600
        // ? '3.75rem'
        // :
      >
        <div className={s.postProjectCards}>
          <Card
            titleRight="04"
            title="Long Term Partnership"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <div className={s.cardContent}></div>
          </Card>
          <Card
            titleRight="05"
            title="On-going Project Support"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <div className={s.cardContent}></div>
          </Card>
          <Card
            titleRight="06"
            title="Growth Support"
            textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
          >
            <div className={s.cardContent}></div>
          </Card>
        </div>
      </div>
    </div>
  )
}
