import {
  DoubleImageBlockRecord,
  FeaturedMediaFragment
} from '@/graphql/generated/graphql'
import s from './RDDoubleImage.module.scss'
import MuxPlayer from '@mux/mux-player-react'
import { useWindowSize } from '@/utils/useWindowSize'

export const RDDoubleImage = ({
  data,
  colour
}: {
  data: {
    imageLeft?: FeaturedMediaFragment
    imageRight?: FeaturedMediaFragment
    videoLeft?: string
    videoRight?: string
    heightLeft?: number
    heightRight?: number
  }
  colour?: string
}) => {
  const windowSize = useWindowSize()

  if (!windowSize.width) return
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        {data.imageLeft && (
          <img
            src={`${data.imageLeft?.responsiveImage?.src}`}
            alt={`${data.imageLeft?.responsiveImage?.alt}`}
            className={s.image}
          />
        )}
      </div>

      <div className={s.right}>
        {data.imageRight && (
          <img
            src={data.imageRight?.responsiveImage?.src}
            alt={`${data.imageRight?.responsiveImage?.alt}`}
            className={s.image}
          />
        )}
      </div>
    </div>
  )
}
