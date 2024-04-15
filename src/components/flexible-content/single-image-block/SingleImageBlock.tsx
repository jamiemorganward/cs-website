import { SingleImageBlockRecord } from '@/graphql/generated/graphql'
import s from './SingleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

export const SingleImageBlock = ({
  data
}: {
  data: SingleImageBlockRecord
}) => {
  return (
    <div className={`${s.wrapper} ${data.fullwidth ? s.fullwidth : ''}`}>
      {data.image?.responsiveImage && (
        <img
          src={`${data.image?.responsiveImage?.src}`}
          alt={`${data.image?.responsiveImage?.alt}`}
          title={`${data.image?.responsiveImage?.title}`}
        />
      )}
      {data.image?.video && (
        <MuxPlayer src={data.image.video.streamingUrl} autoPlay="any" loop />
      )}
    </div>
  )
}
