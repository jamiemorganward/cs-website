import { SingleImageBlockRecord } from '@/graphql/generated/graphql'
import s from './SingleImageBlock.module.scss'

export const SingleImageBlock = ({
  data
}: {
  data: SingleImageBlockRecord
}) => {
  return (
    <div className={`${s.wrapper} ${data.fullwidth ? s.fullwidth : ''}`}>
      <img
        src={`${data.image?.responsiveImage?.src}`}
        alt={`${data.image?.responsiveImage?.alt}`}
        title={`${data.image?.responsiveImage?.title}`}
      />
    </div>
  )
}
