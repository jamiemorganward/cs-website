'use client'
import { GetAllRdProjectsQuery } from '@/graphql/generated/graphql'
import s from './RDPage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import Link from 'next/link'
import { RDProject } from '../rd-project/RDProject'
import { ReactLenis } from '@studio-freight/react-lenis'

export const RDPage = ({ projects }: { projects: GetAllRdProjectsQuery }) => {
  if (!projects) return <></>

  return (
    <>
      {/* <ReactLenis root> */}
      <div className={s.titleWrapper}>
        <PageTitle title="R&D" />
      </div>
      <div className={s.rdGridWrapper}>
        {projects.allRdProjects.map((project: any, i: number) => {
          return (
            <div key={i} className={s.projectOuterWrapper}>
              <RDProject
                name={project.projectName}
                media={project.featuredMedia?.responsiveImage?.src}
                year={project.year}
                slug={project.slug}
              />
            </div>
          )
        })}
      </div>
      {/* </ReactLenis> */}
    </>
  )
}
