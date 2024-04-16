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
  }
  colour?: string
}) => {
  console.log(data.videoLeft)
  return (
    <div className={s.wrapper}>
      <div
        className={s.left}
        style={{
          backgroundColor: colour ? colour : ''
        }}
      >
        {data.imageLeft?.responsiveImage && (
          <img
            src={`${data.imageLeft?.responsiveImage?.src}`}
            alt={`${data.imageLeft?.responsiveImage?.alt}`}
            title={`${data.imageLeft?.responsiveImage?.title}`}
          />
        )}
        {data.videoLeft && (
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={data.videoLeft} />
          </video>
        )}
      </div>
      <div
        className={s.right}
        style={{
          backgroundColor: colour ? colour : ''
        }}
      >
        <img
          src={data.imageRight?.responsiveImage?.src}
          alt={`${data.imageRight?.responsiveImage?.alt}`}
          title={`${data.imageRight?.responsiveImage?.title}`}
        />
        {data.videoRight && (
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={data.videoRight} />
          </video>
        )}
      </div>
    </div>
  )
}
