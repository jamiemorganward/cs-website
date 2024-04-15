import { DoubleImageBlockRecord } from '@/graphql/generated/graphql'
import s from './DoubleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

export const DoubleImageBlock = ({
  data
}: {
  data: DoubleImageBlockRecord
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
          <MuxPlayer
            src={data.imageLeft.video.streamingUrl}
            autoPlay="any"
            loop
          />
        )}
      </div>
      <div className={s.right}>
        <img
          src={data.imageRight?.responsiveImage?.src}
          alt={`${data.imageRight?.responsiveImage?.alt}`}
          title={`${data.imageRight?.responsiveImage?.title}`}
        />
        {data.imageRight?.video && (
          <MuxPlayer
            src={data.imageRight.video.streamingUrl}
            autoPlay="any"
            loop
          />
        )}
      </div>
    </div>
  )
}
