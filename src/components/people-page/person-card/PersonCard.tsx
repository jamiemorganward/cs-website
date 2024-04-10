'use client'
import React, { useEffect, useState } from 'react'
import s from './PersonCard.module.scss'
import { PersonFragment } from '@/graphql/generated/graphql'
import MuxPlayer from '@mux/mux-player-react'
import { DateTime } from 'luxon'

export const PersonCard = ({
  person,
  margins
}: {
  person: PersonFragment
  margins: { top: number; right: number; bottom: number; left: number }
}) => {
  const [isHover, setIsHover] = useState(false)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const currentTime = DateTime.now().toFormat('HH:mm')
    const opening = DateTime.fromISO('08:00').toFormat('HH:mm')
    const closing = DateTime.fromISO('17:30').toFormat('HH:mm')
    if (currentTime > opening && currentTime < closing) {
      setOnline(true)
    }
  }, [])

  return (
    <div
      className={s.personCard}
      style={{
        marginTop: `${margins.top}vw`,
        marginRight: `${margins.right}vw`,
        marginBottom: `${margins.bottom}vw`,
        marginLeft: `${margins.left}vw`
      }}
    >
      <div
        className={s.imageCard}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {person.headshot && !isHover && (
          <img
            className={s.headshot}
            src={person.headshot.responsiveImage?.src}
          />
        )}
        {isHover && online && person.inOfficeVideo && (
          <MuxPlayer
            autoPlay="any"
            loop
            className={s.video}
            src={person.inOfficeVideo.video?.streamingUrl}
          />
        )}
        {isHover && !online && person.outOfOfficeVideo && (
          <MuxPlayer
            autoPlay="any"
            loop
            className={s.video}
            src={person.outOfOfficeVideo.video?.streamingUrl}
          />
        )}
        {isHover && online && (
          <div className={s.onlineBadge}>
            <div className={s.greenCircle}></div>
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
