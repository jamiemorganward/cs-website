import { DoubleImageBlockRecord } from '@/graphql/generated/graphql'
import s from './DoubleImageBlock.module.scss'

export const DoubleImageBlock = ({
  data
}: {
  data: DoubleImageBlockRecord
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <img
          src={`${data.imageLeft?.responsiveImage?.src}`}
          alt={`${data.imageLeft?.responsiveImage?.alt}`}
          title={`${data.imageLeft?.responsiveImage?.title}`}
        />
      </div>
      <div className={s.right}>
        <img
          src={data.imageRight?.responsiveImage?.src}
          alt={`${data.imageRight?.responsiveImage?.alt}`}
          title={`${data.imageRight?.responsiveImage?.title}`}
        />
      </div>
    </div>
  )
}
