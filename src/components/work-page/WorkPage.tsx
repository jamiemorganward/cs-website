'use client'
import {
  GetAllProjectsQuery,
  ProjectFragment,
  ProjectOnWorkPageFragment,
  ProjectRecord
} from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { useEffect, useRef, useState } from 'react'
import { PageTitle } from '../page-title/PageTitle'
import { FilterBar } from '../filter-bar/FilterBar'
import { Project } from '../project/Project'
import { useWindowSize } from '@/utils/useWindowSize'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  const [categories, setAllCategories] = useState<string[]>([])
  const [localProjects, setLocalProjects] = useState<
    Array<ProjectOnWorkPageFragment>
  >([])
  const [filters, setFilters] = useState<string[]>([])
  const filterRef = useRef<HTMLDivElement | null>(null)
  const windowSize = useWindowSize()

  const organise = () => {
    let tempCats: string[] = []
    data.allProjects.map((project) => {
      project.multiCategory?.map((cat: string) => {
        tempCats.push(`${cat}`)
      })
    })
    setAllCategories(tempCats)
    setLocalProjects(data.allProjects)
  }

  useEffect(() => {
    organise()
  }, [])

  const addOrRemove = (e: string) => {
    if (!filters.includes(e)) {
      setFilters([...filters, e])
    } else {
      let _filters = filters.filter((item) => item !== e)
      setFilters(_filters)
    }
  }

  useEffect(() => {
    const _projects: ProjectOnWorkPageFragment[] = []

    data.allProjects.map((project) => {
      if (project.category && filters.includes(project.category)) {
        _projects.push(project)
      } else {
        return
      }
    })
    setLocalProjects(_projects)
    if (filters.length < 1) {
      setLocalProjects(data.allProjects)
    }
  }, [filters])

  if (!localProjects || !windowSize.width) return <></>

  return (
    <div>
      <div className={s.titleWrapper}>
        <PageTitle title="Work" />
      </div>
      <ReactLenis root>
        <div className={s.filterSticky} ref={filterRef}>
          <FilterBar
            filterItems={categories}
            filters={filters}
            setFilters={(e: string) => addOrRemove(e)}
          />
        </div>

        {localProjects.map((project: any, i: number) => {
          return (
            <div key={i} className={s.projectOuterWrapper}>
              <Project
                noLine
                name={project.projectName}
                service={project.service}
                client={project.client}
                image={project.featuredImage}
                video={project.featuredVideo}
                slug={project.slug}
                year={project.year}
                category={project.category}
                alignment={project.alignment}
                colour={project.themeColour?.hex}
              />
            </div>
          )
        })}
      </ReactLenis>
    </div>
  )
}
