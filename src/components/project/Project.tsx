'use client'
import { FeaturedMediaFragment } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import MuxPlayer from '@mux/mux-player-react'
import Marquee from 'react-fast-marquee'
import { useWindowSize } from '@/utils/useWindowSize'
import TransitionLink from '../transition-link/TransitionLink'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export const Project = ({
  slug,
  name,
  client,
  service,
  alignment,
  projectUrl,
  year,
  multiCategory,
  image,
  noLine,
  noLink,
  colour,
  video
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
  multiCategory?: string[]
  noLine?: boolean
  noLink?: boolean
  colour?: string
}) => {
  const windowSize = useWindowSize()

  if (typeof windowSize.width === 'undefined') return <></>

  return (
    <>
      {!noLink && (
        <TransitionLink
          className={`${s.projectWrapper} ${s.noCursor}`}
          href={`/work${slug}`}
        >
          {windowSize.width < 991 ? (
            <div className={`${s.projectInfoWrapper} ${s.tickerTape}`}>
              <Marquee pauseOnHover autoFill>
                <div className={s.client}>{client}</div>
                <div className={s.service}>{service}</div>
                <div className={s.projectName}>{year}</div>
              </Marquee>
            </div>
          ) : (
            <div className={`${s.projectInfoWrapper}`}>
              <div className={s.client}>{client}</div>
              <div className={s.service}>{service}</div>
              <div className={s.projectName}>{year}</div>
            </div>
          )}

          {image && image?.responsiveImage && (
            <div
              className={`${s.imageWrapper} ${alignment === 'left' && s.left}
            ${alignment === 'right' && s.right}
            ${alignment === 'fullwidth' && s.fullWidth}`}
              style={{ backgroundColor: colour }}
            >
              <img
                className={`${s.featuredImage}`}
                src={image.responsiveImage.src}
              />
            </div>
          )}

          {video && (
            <div
              className={`${s.videoWrapper}`}
              style={{ backgroundColor: colour }}
            >
              <video width="100%" height="100%" autoPlay loop muted playsInline>
                <source src={video} />
              </video>
            </div>
          )}
        </TransitionLink>
      )}
      {noLink && (
        <div className={s.projectWrapper}>
          {windowSize.width < 991 ? (
            <div className={`${s.projectInfoWrapper} ${s.tickerTape}`}>
              <Marquee pauseOnHover autoFill>
                <div className={s.client}>{client}</div>
                <div className={s.service}>{service}</div>
                <div className={s.projectName}>{year}</div>
              </Marquee>
            </div>
          ) : (
            <div className={`${s.projectInfoWrapper}`}>
              <div className={s.client}>{client}</div>
              <div className={s.service}>{service}</div>
              <div className={s.projectName}>{year}</div>
            </div>
          )}

          {image && image?.responsiveImage && (
            <div className={s.imageWrapper} style={{ backgroundColor: colour }}>
              <img
                className={`${s.featuredImage}
        ${alignment === 'left' && s.left}
        ${alignment === 'right' && s.right}
        ${alignment === 'fullwidth' && s.fullWidth}`}
                src={image.responsiveImage.src}
              />
            </div>
          )}

          {video && (
            <div
              className={`${s.videoWrapper}`}
              style={{ backgroundColor: colour }}
            >
              <video width="100%" height="100%" autoPlay loop muted playsInline>
                <source src={video} />
              </video>
            </div>
          )}
        </div>
      )}
    </>
  )
}
