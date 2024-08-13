'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './AboutPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { EmailSelection } from './email-selection/EmailSelection'
import { AboutPageQuery } from '@/graphql/generated/graphql'
import { Card } from '../card/Card'
import { Project } from '../project/Project'
import { ReactLenis } from '@studio-freight/react-lenis'
import { ImageScroll } from '../image-scroll/ImageScroll'

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
      <ReactLenis root>
        <div className={s.blurbSection}>
          <h1 className={s.blurb}>{data.blurb}</h1>
        </div>
        <div className={s.cardSection}>
          {data.cardSection &&
            data.cardSection.map((card, i) => {
              return <Card key={i} card={card}></Card>
            })}
        </div>
        <div className={s.partnerships} ref={partnershipsRef}>
          <h2 className={s.partnershipTitle}>Long Standing Partnerships</h2>
        </div>
        <div className={s.daddyWrapper} style={{ position: 'relative' }}>
          {data.longStandingPartnerships &&
            data.longStandingPartnerships.map((partner, i) => {
              if (!partner.featuredVideo) return
              return (
                <div className={s.stickyWrapper} key={i}>
                  {i === 0 && <></>}

                  <Project
                    key={i}
                    name={`${partner.client}`}
                    client={`${partner.client}`}
                    shortDescription={`${partner.service}`}
                    year={`${partner.yearStarted}`}
                    video={partner.featuredVideo}
                    noLink
                    alignment={partner.alignment || 'fullwidth'}
                    colour={partner.themeColour?.hex}
                  />
                </div>
              )
            })}
        </div>
        <div className={s.partnerships}>
          <h2 className={s.partnershipTitle}>Our Services</h2>
        </div>
        <div className={s.servicesCardWrapper}>
          {data.ourServices.map((card, i) => {
            return <Card key={i} card={card}></Card>
          })}
        </div>
        <ImageScroll image={data.officeImage?.responsiveImage?.src} />
        <EmailSelection />
      </ReactLenis>
    </div>
  )
}
