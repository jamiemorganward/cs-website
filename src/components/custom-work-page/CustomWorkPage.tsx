'use client'
import React from 'react'
import s from './CustomWorkPage.module.scss'
import { GetAllCustomWorkProjectsQuery } from '@/graphql/generated/graphql'
import { WorkPage } from '../work-page/WorkPage'

export const CustomWorkPage = ({
  data
}: {
  data: GetAllCustomWorkProjectsQuery
}) => {
  if (!data.customWorkPage?.projects) return
  // TODO: We need to suss the 404s before this is fully stable
  return (
    <div className={s.customWorkPage}>
      <WorkPage
        data={data.customWorkPage?.projects}
        title={data.customWorkPage?.title || undefined}
      />
    </div>
  )
}
