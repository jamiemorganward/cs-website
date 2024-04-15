import {
  FeaturedMediaFragment,
  SingleImageBlockRecord
} from '@/graphql/generated/graphql'
import s from './SingleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

export const SingleImageBlock = ({
  data,
  fullWidth
}: {
  data: { image: FeaturedMediaFragment }
  fullWidth?: boolean
}) => {
  return (
    <div className={`${s.wrapper} ${fullWidth ? s.fullwidth : ''}`}>
      {data.image?.responsiveImage && (
        <img
          src={`${data.image?.responsiveImage?.src}`}
          alt={`${data.image?.responsiveImage?.alt}`}
          title={`${data.image?.responsiveImage?.title}`}
        />
      )}
      {data.image?.video && (
        <MuxPlayer src={data.image.video.mp4High} autoPlay="any" loop />
      )}
    </div>
  )
}
