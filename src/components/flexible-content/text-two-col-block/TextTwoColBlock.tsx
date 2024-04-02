import { TextTwoColumnBlockRecord } from '@/graphql/generated/graphql'
import s from './TextTwoColBlock.module.scss'
import { StructuredText } from 'react-datocms/structured-text'

export const TextTwoColBlock = ({
  data
}: {
  data: TextTwoColumnBlockRecord
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <StructuredText data={data.textLeftColumn?.value} />
      </div>
      <div className={s.right}>
        <StructuredText data={data.textRightColumn?.value} />
      </div>
    </div>
  )
}
