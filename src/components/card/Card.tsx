import React, { ReactNode } from 'react'
import s from './Card.module.scss'

export const Card = ({
  title,
  titleRight,
  textContent,
  children,
  approach,
  aspectRatio = true,
  minHeight
}: {
  title: string
  titleRight?: string
  textContent: string
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
        <h2 className={s.cardTitle}>{title}</h2>
        {/* {titleRight && <h2 className={s.titleRight}>{titleRight}</h2>} */}
      </div>
      {children && <div className={s.contentWrapper}>{children}</div>}
      <div className={s.textContentWrapper}>
        <p
          className={s.textContent}
          dangerouslySetInnerHTML={{ __html: textContent }}
        ></p>
      </div>
    </div>
  )
}
