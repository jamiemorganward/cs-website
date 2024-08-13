'use client'
import s from './ProjectPage.module.scss'
import { GetProjectQuery } from '@/graphql/generated/graphql'
import { useContext, useEffect } from 'react'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { ProjectIntro } from './project-intro/ProjectIntro'
import { FlexibleContent } from '../flexible-content/FlexibleContent'
import { FadeInAnimation } from '../fade-in-animation/FadeInAnimation'
import ReactLenis from '@studio-freight/react-lenis'

export const ProjectPage = ({ data }: { data: GetProjectQuery }) => {
  const ctx = useContext(PageInfoContext)

  useEffect(() => {
    ctx.setProjectName(`${data.project?.client}`)
    return () => {
      // isUnmounted
      ctx.setProjectName('')
    }
  }, [data])
  // To do: pass on data.data.project and figure out typing issue
  return (
    <>
      <ReactLenis root>
        <main>
          <FadeInAnimation delay={0}>
            <ProjectIntro
              title={`${data.project?.projectHeadline}`}
              client={`${data.project?.client}`}
              multiCategory={data.project?.multiCategory}
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
      </ReactLenis>
    </>
  )
}
