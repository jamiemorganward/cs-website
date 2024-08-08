import React, { ReactNode } from 'react'
import s from './Card.module.scss'
import { StructuredText } from 'react-datocms'
import { CardSectionFragment } from '@/graphql/generated/graphql'

export const Card = ({
  card,
  children,
  approach,
  aspectRatio = true,
  minHeight
}: {
  card: CardSectionFragment
  children?: ReactNode
  approach?: boolean
  aspectRatio?: boolean
  minHeight?: number
}) => {
  return (
    <div
      className={`${s.card} ${approach ? s.approach : ''}`}
      style={{
        aspectRatio: aspectRatio ? '0.83/1' : '',
        minHeight: minHeight ? `${minHeight}px` : 'none'
      }}
    >
      <div className={s.titleWrapper}>
        <h2 className={s.cardTitle}>{card.title}</h2>
        {/* {titleRight && <h2 className={s.titleRight}>{titleRight}</h2>} */}
      </div>
      {children && <div className={s.contentWrapper}>{children}</div>}

      <div className={s.textContentWrapper}>
        <StructuredText data={card.textContent?.value} />
      </div>
    </div>
  )
}
