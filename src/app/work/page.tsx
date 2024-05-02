import { WorkPage } from '@/components/work-page/WorkPage'
import {
  GetAllProjectsDocument,
  GetAllProjectsQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Work | ClickSuite'
}

export default async function Page() {
  const client = getClient()
  const data = await client.query<GetAllProjectsQuery>({
    query: GetAllProjectsDocument
  })

  function WorkPageFallBack() {
    return <p>placeholder</p>
  }

  return (
    <Suspense fallback={<WorkPageFallBack />}>
      <WorkPage data={data.data} />
    </Suspense>
  )
}
