import React from 'react'
import s from './RDSingleImage.module.scss'
import { FeaturedMediaFragment } from '@/graphql/generated/graphql'

export const RDSingleImage = ({
  data,
  fullWidth,
  colour
}: {
  data: { image: FeaturedMediaFragment; video?: string }
  fullWidth?: boolean
  colour?: string
}) => {
  return (
    <div className={`${s.wrapper} }`}>
      <div>
        {data.image?.responsiveImage && (
          <img
            src={`${data.image?.responsiveImage?.src}`}
            alt={`${data.image?.responsiveImage?.alt}`}
            className={s.image}
          />
        )}

        {data.video && (
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={data.video} />
          </video>
        )}
      </div>
    </div>
  )
}
