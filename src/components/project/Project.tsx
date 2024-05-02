'use client'
import { FeaturedMediaFragment } from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import MuxPlayer from '@mux/mux-player-react'
import Marquee from 'react-fast-marquee'
import { useWindowSize } from '@/utils/useWindowSize'
import TransitionLink from '../transition-link/TransitionLink'
import { useEffect, useRef } from 'react'

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
  multiCategory?: string[]
  noLine?: boolean
  noLink?: boolean
  colour?: string
  fullwidth?: boolean
}) => {
  const windowSize = useWindowSize()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const onMove = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      const buttonWidth = cursorRef.current.offsetWidth
      const buttonHeight = cursorRef.current.offsetHeight
      const buttonX = mouseX - buttonWidth / 2
      const buttonY = mouseY - buttonHeight / 2

      const maxButtonX = containerRect.width - buttonWidth
      const maxButtonY = containerRect.height - buttonHeight

      gsap.to(cursorRef.current, {
        duration: 0.4,
        overwrite: 'auto',
        x: Math.min(Math.max(buttonX, 0), maxButtonX),
        y: Math.min(Math.max(buttonY, 0), maxButtonY),
        // stagger: 0.1,
        ease: 'Power1.ease'
      })
    }
  }

  const onLeave = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      gsap.killTweensOf(cursorRef.current)
      gsap.to(cursorRef.current, {
        duration: 0.5,
        x:
          (containerRef.current.clientWidth - cursorRef.current.clientWidth) /
          2,
        y:
          (containerRef.current.clientHeight - cursorRef.current.clientHeight) /
          2
      })
    }
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container || !cursorRef.current) return

    gsap.set(cursorRef.current, {
      x: (container.clientWidth - cursorRef.current.clientWidth) / 2,
      y: (container.clientHeight - cursorRef.current.clientHeight) / 2
    })

    container?.addEventListener('mousemove', (e) => onMove(e))
    container?.addEventListener('mouseleave', (e) => onLeave(e))

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef, cursorRef])

  if (typeof windowSize.width === 'undefined') return <></>

  return (
    <>
      {!noLink && (
        <TransitionLink className={s.linkWrapper} href={`/work${slug}`}>
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
            <div className={s.cursor} ref={cursorRef}>
              <p>View Project</p>
            </div>
          </div>
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
