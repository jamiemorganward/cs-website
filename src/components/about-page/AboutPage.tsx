'use client'
import React from 'react'
import s from './AboutPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { EmailSelection } from './email-selection/EmailSelection'
import { AboutPageQuery, AboutPageRecord } from '@/graphql/generated/graphql'
import { Card } from '../card/Card'
import { Partner } from './partner/Partner'

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
        <div className={s.dividingLine}></div>
        {data.longStandingPartnerships &&
          data.longStandingPartnerships.map((partner, i) => {
            return <Partner key={i} partner={partner} />
          })}
      </div>
      <EmailSelection />
    </div>
  )
}
