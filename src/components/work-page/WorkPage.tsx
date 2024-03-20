import {
  GetAllProjectsDocument,
  GetAllProjectsQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import s from './WorkPage.module.scss'
import { Project } from '../project/Project'
import { PageTitle } from '../page-title/PageTitle'

export default async function WorkPage() {
  const client = getClient()
  const data = await client.query<GetAllProjectsQuery>({
    query: GetAllProjectsDocument
  })

  if (!data) return <></>

  return (
    <>
      <PageTitle title="Work" />
      <div className={s.workWrapper}>
        {data.data.allProjects.map((project: any, i: number) => {
          return <Project key={i} data={project} />
        })}
      </div>
    </>
  )
}
