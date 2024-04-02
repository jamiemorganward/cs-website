import s from './ProjectScroller.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { GetAllProjectsQuery } from '@/graphql/generated/graphql'
import { Project } from '@/components/project/Project'

export const ProjectScroller = ({ data }: { data: GetAllProjectsQuery }) => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(useGSAP)
  const projectRefs = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(() => {
    projectRefs.current.map((project, i) => {
      ScrollTrigger.create({
        scrub: true,
        pin: true,
        trigger: project,
        start: 'top 38%',
        // end: '+=50000vh',
        end: document.body.scrollHeight,
        markers: true,
        pinSpacing: false,
        anticipatePin: 2
        // pinReparent: true
      })
    })
  }, [projectRefs])

  return (
    <div className={s.workListWrapper} style={{ height: '3000px' }}>
      {data.allProjects.map((project: any, i: number) => {
        return (
          <div
            key={i}
            className={s.projectOuterWrapper}
            ref={(el) => (projectRefs.current[i] = el)}
          >
            <Project
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
