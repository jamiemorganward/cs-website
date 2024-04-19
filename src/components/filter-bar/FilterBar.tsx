'use client'
import s from './FilterBar.module.scss'
import { countBy, filter, uniq } from 'lodash'

export const FilterBar = ({
  filterItems,
  setFilters,
  filters
}: {
  filterItems: string[]
  setFilters: (e: string) => void
  filters: string[]
}) => {
  const filterWithCount = countBy(filterItems)

  if (!filterWithCount) return <></>
  return (
    <div className={s.filterBar}>
      {Object.keys(filterWithCount).map((item: string, i: number) => {
        return (
          <div
            className={s.filterItem}
            key={i}
            onClick={() => setFilters(item)}
          >
            <div className={s.circle}>
              {filters.includes(item) && <div className={s.circleInner}></div>}
            </div>
            <p className={s.listText}>{item}</p>
            <p className={s.count}>{filterWithCount[item]}</p>
          </div>
        )
      })}
    </div>
  )
}
