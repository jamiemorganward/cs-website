import { ProjectRecord } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import Link from 'next/link'

export const Project = ({ data }: { data: ProjectRecord }) => {
  return (
    <div className={s.projectWrapper}>
      <Link href={`/work${data.slug}`}>
        <div className={s.projectInfoWrapper}>
          <div>{data.projectName}</div>
          <div>{data.client}</div>
          <div>{data.service}</div>
        </div>
        <img
          className={`${s.featuredImage}
        ${data.alignment === 'left' && s.left}
        ${data.alignment === 'right' && s.right}
        ${data.alignment === 'fullwidth' && s.fullwidth}`}
          src={`${data.featuredImage?.responsiveImage?.src}`}
          alt={`${data.featuredImage?.responsiveImage?.alt}`}
        />
      </Link>
    </div>
  )
}
