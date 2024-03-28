import { TextSingleBlockRecord } from '@/graphql/generated/graphql'
import s from './TextSingleBlock.module.scss'
import { StructuredText } from 'react-datocms/structured-text'

export const TextSingleBlock = ({ data }: { data: TextSingleBlockRecord }) => {
  return (
    <div
      className={`${s.wrapper} ${
        data.textBlockAlignment === 'left'
          ? s.left
          : data.textBlockAlignment === 'right'
          ? s.right
          : ''
      }`}
    >
      <StructuredText data={data.textSingle?.value} />
    </div>
  )
}
