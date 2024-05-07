import Link from 'next/link'
import s from './RDProject.module.scss'
import { RdProjectRecord } from '@/graphql/generated/graphql'

export const RDProject = ({
  name,
  media,
  year,
  slug
}: {
  name: string
  media: string
  year: string
  slug: string
}) => {
  return (
    <Link
      className={s.projectInnerWrapper}
      href={`/rd/project${slug}`}
      scroll={false}
    >
      <img src={media} />
      <div className={s.projectCaption}>
        <h2>{name}</h2>
        <span>{year}</span>
      </div>
    </Link>
  )
}
