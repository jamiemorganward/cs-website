import {
  FeaturedMediaFragment,
  SingleImageBlockRecord
} from '@/graphql/generated/graphql'
import s from './SingleImageBlock.module.scss'
import MuxPlayer from '@mux/mux-player-react'

export const SingleImageBlock = ({
  data,
  fullWidth,
  colour
}: {
  data: { image: FeaturedMediaFragment; video?: string }
  fullWidth?: boolean
  colour?: string
}) => {
  return (
    <div
      className={`${s.wrapper} ${fullWidth ? s.fullwidth : ''}`}
      style={colour ? { backgroundColor: colour, padding: '8rem' } : undefined}
    >
      {data.image?.responsiveImage && (
        <img
          src={`${data.image?.responsiveImage?.src}`}
          alt={`${data.image?.responsiveImage?.alt}`}
          title={`${data.image?.responsiveImage?.title}`}
          className={s.image}
        />
      )}

      {data.video && (
        <video width="100%" height="100%" autoPlay loop muted>
          <source src={data.video} />
        </video>
      )}
    </div>
  )
}
