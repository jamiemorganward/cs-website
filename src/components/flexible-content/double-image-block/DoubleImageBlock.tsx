import {
  DoubleImageBlockRecord,
  FeaturedMediaFragment
} from '@/graphql/generated/graphql'
import s from './DoubleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

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
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div
          className={s.colourWrapper}
          style={{
            backgroundColor: colour ? colour : '',
            height: data.heightLeft ? `${data.heightLeft}vw` : '100%'
          }}
        >
          {data.imageLeft?.responsiveImage && (
            <img
              src={`${data.imageLeft?.responsiveImage?.src}`}
              alt={`${data.imageLeft?.responsiveImage?.alt}`}
              title={`${data.imageLeft?.responsiveImage?.title}`}
              className={s.image}
            />
          )}
          {data.videoLeft && (
            <video width="100%" height="100%" autoPlay loop muted>
              <source src={data.videoLeft} />
            </video>
          )}
        </div>
      </div>
      <div className={s.right}>
        <div
          className={s.colourWrapper}
          style={{
            backgroundColor: colour ? colour : '',
            height: data.heightRight ? `${data.heightRight}vw` : '100%'
          }}
        >
          <img
            src={data.imageRight?.responsiveImage?.src}
            alt={`${data.imageRight?.responsiveImage?.alt}`}
            title={`${data.imageRight?.responsiveImage?.title}`}
            className={s.image}
          />
          {data.videoRight && (
            <video width="100%" height="100%" autoPlay loop muted>
              <source src={data.videoRight} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
