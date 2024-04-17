import React, { ReactNode } from 'react'
import s from './Card.module.scss'

export const Card = ({
  title,
  titleRight,
  textContent,
  children
}: {
  title: string
  titleRight?: string
  textContent: string
  children?: ReactNode
}) => {
  return (
    <div className={s.card}>
      <div className={s.titleWrapper}>
        <h2 className={s.cardTitle}>{title}</h2>
        {titleRight && <h2 className={s.titleRight}>{titleRight}</h2>}
      </div>
      {children && <div className={s.contentWrapper}>{children}</div>}
      <div className={s.textContentWrapper}>
        <p className={s.textContent}>{textContent}</p>
      </div>
    </div>
  )
}
