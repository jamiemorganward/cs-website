import React from 'react'
import s from './AboutPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { EmailSelection } from './email-selection/EmailSelection'

export const AboutPage = () => {
  return (
    <div className={s.aboutPage}>
      <div className={s.headerWrapper}>
        <PageTitle title="About" />
      </div>
      <div className={s.cardSection}></div>
      <EmailSelection />
    </div>
  )
}
