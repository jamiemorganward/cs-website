'use client'
import React from 'react'
import s from './AboutPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { EmailSelection } from './email-selection/EmailSelection'
import { AboutPageQuery, AboutPageRecord } from '@/graphql/generated/graphql'
import { Card } from '../card/Card'
import { Project } from '../project/Project'

export const AboutPage = ({ data }: { data: AboutPageQuery['aboutPage'] }) => {
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
      <div className={s.partnerships}>
        <h2 className={s.partnershipTitle}>Long Standing Partnerships</h2>
      </div>
      {data.longStandingPartnerships &&
        data.longStandingPartnerships.map((partner, i) => {
          if (!partner.featuredMedia) return
          return (
            <div
              className={s.stickyWrapper}
              key={i}
              style={
                i < data.longStandingPartnerships.length - 1
                  ? { position: 'sticky', top: 0 }
                  : { position: 'relative' }
              }
            >
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

      <EmailSelection />
    </div>
  )
}
