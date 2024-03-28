'use client'
import s from './ProjectPage.module.scss'
import { GetProjectQuery } from '@/graphql/generated/graphql'
import { useContext, useEffect } from 'react'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { ProjectIntro } from './project-intro/ProjectIntro'
import { FlexibleContent } from '../flexible-content/FlexibleContent'

export const ProjectPage = ({ data }: { data: GetProjectQuery }) => {
  const ctx = useContext(PageInfoContext)

  useEffect(() => {
    ctx.setProjectName(`${data.project?.projectName}`)
    return () => {
      // isUnmounted
      ctx.setProjectName('')
    }
  }, [data])

  // To do: pass on data.data.project and figure out typing issue
  return (
    <>
      <main>
        <ProjectIntro
          title={`${data.project?.projectName}`}
          client={`${data.project?.client}`}
          category={`${data.project?.category}`}
          service={`${data.project?.service}`}
          platform={`${data.project?.platform}`}
          link={`${data.project?.projectUrl}`}
          year={`${data.project?.year}`}
        />
        <div className={s.flexContentWrapper}>
          {data.project?.flexibleContent.map((slice, i) => {
            return <FlexibleContent key={i} data={slice} />
          })}
        </div>
      </main>
    </>
  )
}
