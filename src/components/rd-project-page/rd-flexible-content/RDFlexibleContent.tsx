import React from 'react'
import s from './RDFlexibleContent.module.scss'
import { Segment } from '@/components/segment/Segment'

import { TextSingleBlock } from '@/components/flexible-content/text-single-block/TextSingleBlock'

import { SingleImageBlock } from '@/components/flexible-content/single-image-block/SingleImageBlock'

import { RDDoubleImage } from './rd-double-image/RDDoubleImage'
import { RDSingleImage } from './rd-single-image/RDSingleImage'

export const RDFlexibleContent = ({
  data,
  themeColour
}: {
  data: any
  themeColour?: string
}) => {
  if (data.__typename === 'DoubleImageBlockRecord') {
    return (
      <Segment>
        <RDDoubleImage data={data} colour={themeColour} />
      </Segment>
    )
  }
  if (data.__typename === 'SingleImageBlockRecord') {
    return (
      <Segment>
        <RDSingleImage
          data={data}
          fullWidth={data.fullwidth}
          colour={themeColour}
        />
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
  return <></>
}
