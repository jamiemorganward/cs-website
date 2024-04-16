import {
  FeaturedMediaFragment,
  SingleImageBlockRecord
} from '@/graphql/generated/graphql'
import s from './SingleImageBlock.module.scss'
import { useWindowSize } from '@/utils/useWindowSize'

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
    <div className={`${s.wrapper} ${fullWidth ? s.fullwidth : ''}`}>
      <div
        className={`${s.colourWrapper} ${fullWidth ? s.fullwidth : ''}`}
        style={colour ? { backgroundColor: colour } : undefined}
      >
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
