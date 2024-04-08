'use client'
import Link from 'next/link'
import s from './FilterBar.module.scss'
import { countBy, filter, uniq } from 'lodash'

export const FilterBar = ({ filterItems }: { filterItems: string[] }) => {
  const filterWithCount = countBy(filterItems)

  if (!filterWithCount) return <></>
  return (
    <div className={s.filterBar}>
      {Object.keys(filterWithCount).map((item: string, i: number) => {
        return (
          // To do: add filtering logic
          <Link className={s.filterItem} key={i} href={''}>
            <div className={s.circle}></div>
            <p className={s.listText}>{item}</p>
            <p className={s.count}>{filterWithCount[item]}</p>
          </Link>
        )
      })}
    </div>
  )
}
