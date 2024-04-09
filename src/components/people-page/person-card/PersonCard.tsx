import React from 'react'
import s from './PersonCard.module.scss'
import { PersonFragment } from '@/graphql/generated/graphql'

export const PersonCard = ({ person }: { person: PersonFragment }) => {
  return <div className={s.personCard}></div>
}
