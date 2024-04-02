'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './AboutPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { EmailSelection } from './email-selection/EmailSelection'
import { AboutPageQuery } from '@/graphql/generated/graphql'
import { Card } from '../card/Card'
import { Project } from '../project/Project'

export const AboutPage = ({ data }: { data: AboutPageQuery['aboutPage'] }) => {
  const partnershipsRef = useRef<HTMLDivElement | null>(null)
  const finalElementRef = useRef<HTMLDivElement | null>(null)
  const [fixed, setFixed] = useState(true)

  const watchMe = () => {
    if (partnershipsRef.current && finalElementRef.current) {
      if (finalElementRef.current?.getBoundingClientRect().top <= 200) {
        setFixed(false)
      } else {
        setFixed(true)
      }
    }
  }

  useEffect(() => {
    if (partnershipsRef && partnershipsRef.current) {
      window.addEventListener('scroll', watchMe)
    }

    return () => {
      window.removeEventListener('scroll', watchMe)
    }
  }, [])

  if (!data) return <></>

  return (
    <div className={s.aboutPage}>
      <div className={s.headerWrapper}>
        <PageTitle title="About" />
      </div>
      <div className={s.cardSection}>
        {data.cardSection &&
          data.cardSection.map((card, i) => {
            return (
              <Card
                key={i}
                title={`${card.title}`}
                textContent={`${card.textContent}`}
              >
                <div className={s.cardSpacer}></div>
              </Card>
            )
          })}
      </div>
      <div className={s.partnerships} ref={partnershipsRef}>
        <h2 className={s.partnershipTitle}>Long Standing Partnerships</h2>
      </div>
      <div
        className={s.daddyWrapper}
        style={{ position: 'relative', paddingBottom: '253px' }}
      >
        {data.longStandingPartnerships &&
          data.longStandingPartnerships.map((partner, i) => {
            if (!partner.featuredMedia) return
            return (
              <div className={s.stickyWrapper} key={i}>
                {i === 0 && <></>}

                <Project
                  key={i}
                  name={`${partner.client}`}
                  client={`${partner.client}`}
                  service={`${partner.service}`}
                  year={`${partner.yearStarted}`}
                  media={partner.featuredMedia}
                />
              </div>
            )
          })}
      </div>
      <EmailSelection />
    </div>
  )
}
