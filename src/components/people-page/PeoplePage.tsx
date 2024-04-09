import React from 'react'
import s from './PeoplePage.module.scss'
import { PageTitle } from '../page-title/PageTitle'

export const PeoplePage = () => {
  return (
    <div className={s.peoplePageWrapper}>
      <PageTitle title="People" />
    </div>
  )
}
