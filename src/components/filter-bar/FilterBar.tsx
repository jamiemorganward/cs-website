'use client'
import Link from 'next/link'
import s from './FilterBar.module.scss'
import { uniq } from 'lodash'

export const FilterBar = ({ filterItems }: { filterItems: string[] }) => {
  return (
    <div className={s.filterBar}>
      {uniq(filterItems).map((item: string, i: number) => {
        return (
          // To do: add filtering logic
          <Link className={s.filterItem} key={i} href={''}>
            <div className={s.circle}></div>
            {item}
          </Link>
        )
      })}
    </div>
  )
}
