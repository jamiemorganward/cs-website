'use client'
import { ProjectRecord } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import Link from 'next/link'

export const Project = ({ data }: { data: ProjectRecord }) => {
  return (
    <Link className={s.projectWrapper} href={`/work${data.slug}`}>
      <div className={s.projectInfoWrapper}>
        <div className={s.projectName}>{data.projectName}</div>
        <div className={s.client}>{data.client}</div>
        <div className={s.service}>{data.service}</div>
      </div>
      <img
        className={`${s.featuredImage}
        ${data.alignment === 'left' ? s.left : ''}
        ${data.alignment === 'right' ? s.right : ''}
        ${data.alignment === 'fullwidth' ? s.fullwidth : ''}`}
        src={`${data.featuredImage?.responsiveImage?.src}`}
        alt={`${data.featuredImage?.responsiveImage?.alt}`}
      />
    </Link>
  )
}
