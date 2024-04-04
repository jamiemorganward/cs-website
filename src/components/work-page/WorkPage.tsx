'use client'
import { GetAllProjectsQuery } from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { useEffect, useRef, useState } from 'react'
import { PageTitle } from '../page-title/PageTitle'
import { FilterBar } from '../filter-bar/FilterBar'
import { Project } from '../project/Project'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  const [categories, setAllCategories] = useState<string[]>([])
  const filterRef = useRef<HTMLDivElement | null>(null)
  const [fixFilters, setFixFilters] = useState(false)

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

  const watchFilters = () => {
    if (
      filterRef.current &&
      filterRef.current?.getBoundingClientRect().top <= 80
    ) {
      setFixFilters(true)
    } else {
      setFixFilters(false)
    }
  }

  useEffect(() => {
    if (filterRef && filterRef.current) {
      window.addEventListener('scroll', watchFilters)
    }

    return () => {
      window.removeEventListener('scroll', watchFilters)
    }
  }, [])

  if (!data) return <></>

  return (
    <div>
      {/* <div className={`${s.header}`}> */}
      <div className={s.titleWrapper}>
        <PageTitle title="Work" />
      </div>
      <div
        className={s.filterSticky}
        ref={filterRef}
        style={{ position: 'sticky' }}
        // style={fixFilters ? { position: 'fixed' } : undefined}
      >
        <FilterBar filterItems={categories} />
      </div>
      {/* </div> */}
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
