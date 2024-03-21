import { WorkPage } from '@/components/work-page/WorkPage'
import {
  GetAllProjectsDocument,
  GetAllProjectsQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import React from 'react'

export default async function Page() {
  const client = getClient()
  const data = await client.query<GetAllProjectsQuery>({
    query: GetAllProjectsDocument
  })

  return <WorkPage data={data.data} />
}
