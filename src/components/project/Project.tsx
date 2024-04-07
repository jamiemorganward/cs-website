'use client'
import { FeaturedMediaFragment } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import Link from 'next/link'
// import Image from 'next/image'
import { Image } from 'react-datocms'
import MuxPlayer from '@mux/mux-player-react'
import { useEffect, useRef } from 'react'

export const Project = ({
  slug,
  name,
  client,
  service,
  alignment,
  projectUrl,
  year,
  category,
  media,
  noLine
}: {
  slug?: string
  name: string
  client: string
  service: string
  alignment?: string
  media: FeaturedMediaFragment
  projectUrl?: string
  year?: string
  category?: string
  noLine?: boolean
}) => {
  useEffect(() => {}, [])
  return (
    <Link className={s.projectWrapper} href={`/work${slug}`}>
      <div className={s.projectInfoWrapper}>
        <div className={s.projectName}>{name}</div>
        <div className={s.client}>{client}</div>
        <div className={s.service}>{service}</div>
      </div>
      {media && media?.responsiveImage && (
        <Image
          className={`${s.featuredImage}
        ${alignment === 'left' ? s.left : ''}
        ${alignment === 'right' ? s.right : ''}
        ${alignment === 'fullwidth' ? s.fullwidth : ''}`}
          data={media.responsiveImage}
          objectFit="cover"
        />
      )}
      {media && media.video && (
        <MuxPlayer
          src={media.video.streamingUrl}
          autoPlay="any"
          loop
          className={`${s.featuredImage} ${s.fullWidth}`}
        />
      )}
    </Link>
  )
}
