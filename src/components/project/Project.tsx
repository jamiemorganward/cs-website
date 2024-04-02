'use client'
import {
  ImageFragment,
  ProjectRecord,
  VideoFragment
} from '@/graphql/generated/graphql'
import s from './Project.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import MuxPlayer from '@mux/mux-player-react'
import { useEffect, useRef } from 'react'

export const Project = ({
  slug,
  name,
  client,
  service,
  alignment,
  image,
  projectUrl,
  year,
  category,
  video
}: {
  slug?: string
  name: string
  client: string
  service: string
  alignment?: string
  image?: ImageFragment
  video?: VideoFragment | null
  projectUrl?: string
  year?: string
  category?: string
}) => {
  useEffect(() => {}, [])
  return (
    <Link className={s.projectWrapper} href={`/work${slug}`}>
      <div className={s.projectInfoWrapper}>
        <div className={s.projectName}>{name}</div>
        <div className={s.client}>{client}</div>
        <div className={s.service}>{service}</div>
      </div>
      {image && (
        <img
          className={`${s.featuredImage}
        ${alignment === 'left' ? s.left : ''}
        ${alignment === 'right' ? s.right : ''}
        ${alignment === 'fullwidth' ? s.fullwidth : ''}`}
          src={`${image?.responsiveImage?.src}`}
          alt={`${image?.responsiveImage?.alt}`}
        />
      )}
      {video?.video && (
        <MuxPlayer src={video.video.streamingUrl} autoPlay="any" loop />
      )}
    </Link>
  )
}
