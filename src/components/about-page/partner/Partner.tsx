import React from 'react'
import s from './Partner.module.scss'
import { PartnerFragment } from '@/graphql/generated/graphql'

export const Partner = ({ partner }: { partner: PartnerFragment }) => {
  return (
    <div className={s.partner}>
      <div className={s.heading}>
        <p className={s.headingText}>{partner.client}</p>
        <p className={s.headingText}>{partner.yearStarted} - Current</p>
        <p className={s.headingText}>Website</p>
      </div>
    </div>
  )
}
