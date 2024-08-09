import React from 'react'
import s from './ImageScroll.module.scss'
import { FileField, ResponsiveImage } from '@/graphql/generated/graphql'

export const ImageScroll = ({ image }: { image?: string }) => {
  if (!image) return
  return (
    <div className={s.imageScrollWrapper}>
      <div
        className={s.imageBackground}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  )
}
