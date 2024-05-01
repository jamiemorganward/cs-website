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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  const [categories, setAllCategories] = useState<string[]>([])
  const [localProjects, setLocalProjects] = useState<
    Array<ProjectOnWorkPageFragment>
  >([])
  const [filters, setFilters] = useState<string[]>([])
  const filterRef = useRef<HTMLDivElement | null>(null)
  const windowSize = useWindowSize()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // Creates the list of categories and sets a local state of projects
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

  // Simple add or remove from the filter list and scroll the user to the top of the page
  const addOrRemove = (e: string) => {
    if (!filters.includes(e)) {
      setFilters([...filters, e])
    } else {
      let _filters = filters.filter((item) => item !== e)
      setFilters(_filters)
    }
    scrollTo({ behavior: 'smooth', top: 0 })
  }

  // Runs each time filter list changes and displays or removes a project from the local state
  // in order to visibly filter the list
  useEffect(() => {
    const _projects: ProjectOnWorkPageFragment[] = []

    data.allProjects.map((project) => {
      project.multiCategory?.map((cat: string) => {
        if (cat && filters.includes(cat)) {
          if (!_projects.includes(project)) {
            _projects.push(project)
          }
        } else {
          return
        }
      })
    })
    setLocalProjects(_projects)
    if (filters.length < 1) {
      setLocalProjects(data.allProjects)
    }
  }, [filters])

  //  Runs anytime a value is added or removed from the list of filters and updates the
  //  url in order to maintain a shareable state
  useEffect(() => {
    if (filters.length > 0) {
      const params = new URLSearchParams(searchParams)
      params.set('filter', filters.toString())
      replace(`${pathname}?${params.toString()}`)
    } else {
      replace(`${pathname}`)
    }
  }, [filters])

  // Runs on mount to check if url contains any filter values if it
  // does those are added to the filter list so that the local state can update
  useEffect(() => {
    let arrayFilters: string[] = []
    const urlFilters = searchParams.get('filter')
    if (urlFilters) {
      arrayFilters = urlFilters.split(',')
      setFilters(arrayFilters)
    }
  }, [])

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
                multiCategory={project.multiCategory}
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
