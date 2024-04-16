import { RDPage } from '@/components/rd-page/RDPage'
import {
  GetAllRdProjectsDocument,
  GetAllRdProjectsQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import React from 'react'

export default async function Page() {
  const client = getClient()
  const data = await client.query<GetAllRdProjectsQuery>({
    query: GetAllRdProjectsDocument
  })

  return <RDPage projects={data.data} />
}
