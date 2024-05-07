import React from 'react'
import s from './RDTextColumn.module.scss'
import { TextSingleBlockRecord } from '@/graphql/generated/graphql'
import { StructuredText } from 'react-datocms'

export const RDTextColumn = ({ data }: { data: TextSingleBlockRecord }) => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.textContent}>
        <StructuredText data={data.textSingle?.value} />
      </div>
    </div>
  )
}
