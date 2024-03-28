import s from './Segment.module.scss'
import { ReactNode } from 'react'

export const Segment = ({ children }: { children: ReactNode }) => {
  return <div className={s.segment}>{children}</div>
}
