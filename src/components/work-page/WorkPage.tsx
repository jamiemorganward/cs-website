'use client'
import { GetAllProjectsQuery } from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { useEffect, useRef, useState } from 'react'
import { PageTitle } from '../page-title/PageTitle'
import { FilterBar } from '../filter-bar/FilterBar'
import { Project } from '../project/Project'
import { useWindowSize } from '@/utils/useWindowSize'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  const [categories, setAllCategories] = useState<string[]>([])
  const filterRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const windowSize = useWindowSize()

  const getAllCategories = () => {
    let tempCats: string[] = []
    data.allProjects.map((project) => {
      tempCats.push(`${project.category}`)
    })

    setAllCategories(tempCats)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    if (windowSize.width && windowSize.width < 991) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [windowSize.width])

  useEffect(() => {
    if (windowSize.width && windowSize.width > 991) {
      setIsMobile(true)
    }
  }, [])

  if (!data || !windowSize.width) return <></>

  return (
    <div>
      <div className={s.titleWrapper}>
        <PageTitle title="Work" />
      </div>
      <div className={s.filterSticky} ref={filterRef}>
        <FilterBar filterItems={categories} />
      </div>

      {data.allProjects.map((project: any, i: number) => {
        return (
          <div key={i} className={s.projectOuterWrapper}>
            <Project
              noLine
              name={project.projectName}
              service={project.service}
              client={project.client}
              media={project.featuredMedia}
              slug={project.slug}
              year={project.year}
              category={project.category}
              alignment={project.alignment}
            />
          </div>
        )
      })}
    </div>
  )
}
