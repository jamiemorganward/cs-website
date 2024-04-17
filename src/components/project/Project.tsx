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
  image,
  noLine,
  noLink,
  colour,
  video,
  fullwidth
}: {
  slug?: string
  name: string
  client: string
  service: string
  alignment?: string
  image?: FeaturedMediaFragment
  video?: string
  projectUrl?: string
  year?: string
  category?: string
  noLine?: boolean
  noLink?: boolean
  colour?: string
  fullwidth?: boolean
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
          {image && image?.responsiveImage && (
            <img
              className={`${s.featuredImage}
        ${alignment === 'left' && s.left}
        ${alignment === 'right' && s.right}
        ${(alignment === 'fullwidth' || fullwidth) && s.fullWidth}`}
              src={image.responsiveImage.src}
            />
          )}
          {video && (
            <div
              className={`${s.videoWrapper} ${fullwidth ? s.fullWidth : ''}`}
              style={{ backgroundColor: colour }}
            >
              <video width="100%" height="100%" autoPlay loop muted>
                <source src={video} />
              </video>
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
          {image && image?.responsiveImage && (
            <img
              className={`${s.featuredImage}
        ${alignment === 'left' && s.left}
        ${alignment === 'right' && s.right}
        ${alignment === 'fullwidth' && s.fullWidth}`}
              src={image.responsiveImage.src}
            />
          )}
          {video && (
            <div
              className={`${s.videoWrapper} ${fullwidth ? s.fullWidth : ''}`}
              style={{ backgroundColor: colour }}
            >
              <video width="100%" height="100%" autoPlay loop muted>
                <source src={video} />
              </video>
            </div>
          )}
        </div>
      )}
    </>
  )
}
