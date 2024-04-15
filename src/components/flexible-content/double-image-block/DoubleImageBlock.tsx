import {
  DoubleImageBlockRecord,
  FeaturedMediaFragment
} from '@/graphql/generated/graphql'
import s from './DoubleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

export const DoubleImageBlock = ({
  data
}: {
  data: {
    imageLeft?: FeaturedMediaFragment
    imageRight?: FeaturedMediaFragment
  }
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        {data.imageLeft?.responsiveImage && (
          <img
            src={`${data.imageLeft?.responsiveImage?.src}`}
            alt={`${data.imageLeft?.responsiveImage?.alt}`}
            title={`${data.imageLeft?.responsiveImage?.title}`}
          />
        )}
        {data.imageLeft?.video && (
          <MuxPlayer src={data.imageLeft.video.mp4High} autoPlay="any" loop />
        )}
      </div>
      <div className={s.right}>
        <img
          src={data.imageRight?.responsiveImage?.src}
          alt={`${data.imageRight?.responsiveImage?.alt}`}
          title={`${data.imageRight?.responsiveImage?.title}`}
        />
        {data.imageRight?.video && (
          <MuxPlayer src={data.imageRight.video.mp4High} autoPlay="any" loop />
        )}
      </div>
    </div>
  )
}
