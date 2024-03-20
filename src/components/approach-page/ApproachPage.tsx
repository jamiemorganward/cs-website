'use client'
import React from 'react'
import s from './ApproachPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { Card } from '../card/Card'
import Yellow from '@/assets/svgs/lil-guys/yellow-bloke.svg'
import Orange from '@/assets/svgs/lil-guys/orange-bloke.svg'
import Purple from '@/assets/svgs/lil-guys/purple-bloke.svg'

export const ApproachPage = () => {
  return (
    <div className={s.approachPage}>
      <PageTitle title="Approach" />
      <div className={s.cardWrapper}>
        <Card
          title="Form"
          titleRight="01"
          textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
        >
          <Yellow />
        </Card>
        <Card
          title="Fun"
          titleRight="02"
          textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
        >
          <Purple />
        </Card>
        <Card
          title="Function"
          titleRight="03"
          textContent="No effort to create an effective website needs to come at the expense of aesthetics. The opposite is actually true. Building beautiful websites and applications is a crucial component in creating a successful experience for users."
        >
          <Orange />
        </Card>
      </div>
    </div>
  )
}
