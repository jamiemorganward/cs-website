'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './PersonCard.module.scss'
import { PersonFragment } from '@/graphql/generated/graphql'
import MuxPlayer from '@mux/mux-player-react'
import { DateTime } from 'luxon'
import { useWindowSize } from '@/utils/useWindowSize'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const PersonCard = ({
  person,
  margins
}: {
  person: PersonFragment
  margins: { top: number; right: number; bottom: number; left: number }
}) => {
  const [isHover, setIsHover] = useState(false)
  const [online, setOnline] = useState(true)
  const windowSize = useWindowSize()
  const circleRef = useRef<HTMLDivElement | null>(null)

  // TODO: Add this back and the mouse hover when we want to
  // useEffect(() => {
  //   const currentTime = DateTime.now().toFormat('HH:mm')
  //   const opening = DateTime.fromISO('08:00').toFormat('HH:mm')
  //   const closing = DateTime.fromISO('17:30').toFormat('HH:mm')
  //   if (currentTime > opening && currentTime < closing) {
  //     setOnline(true)
  //   }
  // }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    if (circleRef.current) {
      tl.to(circleRef.current, { scale: 1.2, duration: 1 })
    }

    tl.play()
  }, [{ circleRef }])

  if (!windowSize.width) return <></>

  return (
    <div
      className={s.personCard}
      style={
        windowSize.width > 991
          ? {
              marginTop: `${margins.top}vw`,
              marginRight: `${margins.right}vw`,
              marginBottom: `${margins.bottom}vw`,
              marginLeft: `${margins.left}vw`
            }
          : undefined
      }
    >
      <div
        className={s.imageCard}
        // onMouseEnter={() => setIsHover(true)}
        // onMouseLeave={() => setIsHover(false)}
      >
        {person.headshot && (
          <img
            className={s.headshot}
            style={isHover ? { zIndex: -1 } : { zIndex: 10 }}
            src={person.headshot.responsiveImage?.src}
          />
        )}
        {online && person.inOfficeVideo && (
          <MuxPlayer
            autoPlay="any"
            loop
            className={s.video}
            src={person.inOfficeVideo.video?.streamingUrl}
          />
        )}
        {!online && person.outOfOfficeVideo && (
          <MuxPlayer
            autoPlay="any"
            loop
            className={s.video}
            src={person.outOfOfficeVideo.video?.streamingUrl}
          />
        )}
        {isHover && online && (
          <div className={s.onlineBadge}>
            <div className={s.greenCircle} ref={circleRef}></div>
            <p className={s.online}>Online</p>
          </div>
        )}
        {isHover && !online && (
          <div className={s.offlineBadge}>
            <div className={s.redCircle}></div>
            <p className={s.offline}>Offline</p>
          </div>
        )}
      </div>
      <p className={s.name}>{person.name}</p>
      <p className={s.role}>{person.jobTitle}</p>
    </div>
  )
}
