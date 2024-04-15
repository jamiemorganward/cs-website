'use client'
import { FeaturedMediaFragment } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import Link from 'next/link'
import MuxPlayer from '@mux/mux-player-react'

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
  noLine,
  noLink,
  colour
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
  noLink?: boolean
  colour?: string
}) => {
  return (
    <>
      {!noLink && (
        <Link className={s.projectWrapper} href={`/work${slug}`}>
          <div className={`${s.projectInfoWrapper}`}>
            <div className={s.projectName}>{name}</div>
            <div className={s.client}>{client}</div>
            <div className={s.service}>{service}</div>
          </div>
          {media && media?.responsiveImage && (
            <img
              className={`${s.featuredImage}
        ${alignment === 'left' && s.left}
        ${alignment === 'right' && s.right}
        ${alignment === 'fullwidth' && s.fullWidth}`}
              src={media.responsiveImage.src}
            />
          )}
          {media && media.video && (
            <div className={s.videoWrapper} style={{ backgroundColor: colour }}>
              <MuxPlayer
                src={media.video.streamingUrl}
                autoPlay="any"
                loop
                className={`${s.featuredImage}`}
              />
            </div>
          )}
        </Link>
      )}
      {noLink && (
        <div className={s.projectWrapper}>
          <div className={s.projectInfoWrapper}>
            <div className={s.projectName}>{name}</div>
            <div className={s.client}>{client}</div>
            <div className={s.service}>{service}</div>
          </div>
          {media && media?.responsiveImage && (
            <img
              className={`${s.featuredImage}
        ${alignment === 'left' ? s.left : ''}
        ${alignment === 'right' ? s.right : ''}
        ${alignment === 'fullwidth' ? s.fullwidth : ''}`}
              src={media.responsiveImage.src}
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
        </div>
      )}
    </>
  )
}
