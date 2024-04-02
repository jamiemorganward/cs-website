import { QuoteBlockRecord } from '@/graphql/generated/graphql'
import s from './QuoteBlock.module.scss'
import { StructuredText } from 'react-datocms/structured-text'

export const QuoteBlock = ({ data }: { data: QuoteBlockRecord }) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.quote}>
        <StructuredText data={data.quote?.value} />
      </h1>
      <p className={s.quotee}>{data.quotee}</p>
    </div>
  )
}
