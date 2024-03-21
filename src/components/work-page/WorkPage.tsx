import { GetAllProjectsQuery } from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { Project } from '../project/Project'
import { PageTitle } from '../page-title/PageTitle'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  if (!data) return <></>

  return (
    <>
      <PageTitle title="Work" />
      <div className={s.workWrapper}>
        {data.allProjects.map((project: any, i: number) => {
          return <Project key={i} data={project} />
        })}
      </div>
    </>
  )
}
