import {
  DoubleImageBlockRecord,
  FeaturedMediaFragment
} from '@/graphql/generated/graphql'
import s from './DoubleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'
import { useWindowSize } from '@/utils/useWindowSize'

export const DoubleImageBlock = ({
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
        {(data.imageLeft || data.videoLeft) && (
          <div
            className={s.colourWrapper}
            style={{
              backgroundColor: colour ? colour : '',
              height:
                data.heightLeft && windowSize.width > 767
                  ? `${data.heightLeft}vw`
                  : undefined
            }}
          >
            {data.imageLeft?.responsiveImage && (
              <img
                src={`${data.imageLeft?.responsiveImage?.src}`}
                alt={`${data.imageLeft?.responsiveImage?.alt}`}
                className={s.image}
              />
            )}
            {data.videoLeft && (
              <video width="100%" height="100%" autoPlay loop muted>
                <source src={data.videoLeft} />
              </video>
            )}
          </div>
        )}
      </div>
      <div className={s.right}>
        {(data.imageRight || data.videoRight) && (
          <div
            className={s.colourWrapper}
            style={{
              backgroundColor: colour ? colour : '',
              height:
                data.heightRight && windowSize.width > 767
                  ? `${data.heightRight}vw`
                  : undefined
            }}
          >
            {data.imageRight && (
              <img
                src={data.imageRight?.responsiveImage?.src}
                alt={`${data.imageRight?.responsiveImage?.alt}`}
                className={s.image}
              />
            )}
            {data.videoRight && (
              <video width="100%" height="100%" autoPlay loop muted>
                <source src={data.videoRight} />
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
