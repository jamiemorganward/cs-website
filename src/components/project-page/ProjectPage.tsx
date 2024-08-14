'use client'
import s from './ProjectPage.module.scss'
import {
  GetProjectQuery,
  NextProjectFragment
} from '@/graphql/generated/graphql'
import { useContext, useEffect, useRef, useState } from 'react'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { ProjectIntro } from './project-intro/ProjectIntro'
import { FlexibleContent } from '../flexible-content/FlexibleContent'
import { FadeInAnimation } from '../fade-in-animation/FadeInAnimation'
import ReactLenis from '@studio-freight/react-lenis'
import { NextProjectHolder } from './next-project-holder/NextProjectHolder'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useWindowSize } from '@/utils/useWindowSize'

export const ProjectPage = ({
  data,
  projects
}: {
  data: GetProjectQuery
  projects: NextProjectFragment[]
}) => {
  gsap.registerPlugin(ScrollTrigger)

  const ctx = useContext(PageInfoContext)
  const [nextProject, setNextProject] = useState<NextProjectFragment | null>(
    null
  )
  const contentRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)
  const windowSize = useWindowSize()

  useEffect(() => {
    ctx.setProjectName(`${data.project?.client}`)
    return () => {
      ctx.setProjectName('')
    }
  }, [data])
  // To do: pass on data.data.project and figure out typing issue

  const sortProjects = () => {
    if (!data.project) return
    projects.map((project, i) => {
      if (project.id === data?.project?.id) {
        setNextProject(projects[i + 1])
      }
    })
  }

  useEffect(() => {
    sortProjects()
  }, [data.project])

  useGSAP(() => {
    const tl = gsap.timeline({})

    tl.to(contentRef.current, { filter: 'blur(8px)', duration: 1 }, '<')
    tl.to(contentRef.current, { backgroundColor: 'rgba(0,0,0,0.2)' }, '<')

    ScrollTrigger.create({
      trigger: contentRef.current,
      animation: tl,
      start: 'bottom bottom',
      end: () => `+=${window.innerHeight * 0.8}`,
      scrub: 0,
      pin: contentRef.current,
      pinSpacing: false
    })
  }, [])

  return (
    <>
      <ReactLenis root>
        <main ref={contentRef} className={s.mainWrapper}>
          <FadeInAnimation delay={0}>
            <ProjectIntro
              title={`${data.project?.projectHeadline}`}
              client={`${data.project?.client}`}
              description={`${data.project?.projectDescription}`}
              ourRole={`${data.project?.ourRole}`}
              link={`${data.project?.projectUrl}`}
              year={`${data.project?.year}`}
            />
          </FadeInAnimation>
          <div className={s.flexContentWrapper}>
            {data.project?.flexibleContent.map((slice, i) => {
              return (
                <FadeInAnimation delay={i === 0 ? 0.25 : 0} key={i}>
                  <FlexibleContent
                    data={slice}
                    themeColour={data.project?.themeColour?.hex}
                  />
                </FadeInAnimation>
              )
            })}
          </div>
        </main>

        <div className={s.nextWrapper} ref={nextRef}>
          {nextProject && <NextProjectHolder project={nextProject} />}
        </div>
      </ReactLenis>
    </>
  )
}
