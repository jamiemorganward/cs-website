'use client'
import {
  GetAllProjectsQuery,
  ProjectOnWorkPageFragment
} from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PageTitle } from '../page-title/PageTitle'
import { FilterBar } from '../filter-bar/FilterBar'
import { Project } from '../project/Project'
import { useWindowSize } from '@/utils/useWindowSize'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import gsap from 'gsap'

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

  // Mouse Logic starts here

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)

  const onMove = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      gsap.killTweensOf(cursorRef.current)
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      const buttonWidth = cursorRef.current.offsetWidth
      const buttonHeight = cursorRef.current.offsetHeight
      const buttonX = mouseX - buttonWidth / 2
      const buttonY = mouseY - buttonHeight / 2

      const maxButtonX = containerRect.width - buttonWidth
      const maxButtonY = containerRect.height - buttonHeight

      const tl = gsap.timeline()

      tl.to(cursorRef.current, {
        duration: 0.1,
        overwrite: 'auto',
        x: Math.min(Math.max(buttonX, 0), maxButtonX),
        y: Math.min(Math.max(buttonY, 0), maxButtonY),
        stagger: 0.1,
        ease: 'Power1.ease'
      })
      tl.to(cursorRef.current, { opacity: 1 }, '=<')
    }
  }

  const onLeave = (e: any) => {
    if (cursorRef.current && containerRef.current) {
      gsap.killTweensOf(cursorRef.current)
      const tl = gsap.timeline()
      tl.to(cursorRef.current, { opacity: 0, duration: 0.1 })
      tl.to(
        cursorRef.current,
        {
          duration: 0.5,
          x:
            (containerRef.current.clientWidth - cursorRef.current.clientWidth) /
            2,
          y:
            (containerRef.current.clientHeight -
              cursorRef.current.clientHeight) /
            2
        },
        '<1'
      )
    }
  }

  const hereWeGo = (e: any) => {
    console.log(e)
  }
  useLayoutEffect(() => {
    const container = containerRef.current
    const pageWrap = pageRef.current

    if (!container || !cursorRef.current || !pageWrap) return

    gsap.set(cursorRef.current, {
      x: (container.clientWidth - cursorRef.current.clientWidth) / 2,
      y: (container.clientHeight - cursorRef.current.clientHeight) / 2
    })

    container?.addEventListener('mousemove', (e) => onMove(e))
    container?.addEventListener('mouseleave', (e) => onLeave(e))

    return () => {
      container?.removeEventListener('mousemove', onMove)
      container?.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef, cursorRef, windowSize.width, localProjects])

  if (!localProjects || !windowSize.width) return <></>

  return (
    <div ref={pageRef}>
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
        <div className={s.wrapperRef} ref={containerRef}>
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
          <div className={s.cursor} ref={cursorRef}>
            <p>View Project</p>
          </div>
        </div>
      </ReactLenis>
    </div>
  )
}
