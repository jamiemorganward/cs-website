import { Segment } from '../segment/Segment'
import { DoubleImageBlock } from './double-image-block/DoubleImageBlock'
import { QuoteBlock } from './quote-block/QuoteBlock'
import { SingleImageBlock } from './single-image-block/SingleImageBlock'
import { TextSingleBlock } from './text-single-block/TextSingleBlock'
import { TextTwoColBlock } from './text-two-col-block/TextTwoColBlock'

export const FlexibleContent = ({ data }: { data: any }) => {
  if (data.__typename === 'DoubleImageBlockRecord') {
    return (
      <Segment>
        <DoubleImageBlock data={data} />
      </Segment>
    )
  }
  if (data.__typename === 'SingleImageBlockRecord') {
    return (
      <Segment>
        <SingleImageBlock data={data} />
      </Segment>
    )
  }
  if (data.__typename === 'QuoteBlockRecord') {
    return (
      <Segment>
        <QuoteBlock data={data} />
      </Segment>
    )
  }
  if (data.__typename === 'TextSingleBlockRecord') {
    return (
      <Segment>
        <TextSingleBlock data={data} />
      </Segment>
    )
  }
  if (data.__typename === 'TextTwoColumnBlockRecord') {
    return (
      <Segment>
        <TextTwoColBlock data={data} />
      </Segment>
    )
  }
  return <></>
}
