import React from 'react'
import s from './NextProjectHolder.module.scss'
import { NextProjectFragment } from '@/graphql/generated/graphql'

export const NextProjectHolder = ({
  project
}: {
  project: NextProjectFragment
}) => {
  return <div className={s.nextProjectHolder}>{project.client}</div>
}
