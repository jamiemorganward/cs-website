import { CustomWorkPage } from '@/components/custom-work-page/CustomWorkPage'
import {
  GetAllCustomWorkProjectsDocument,
  GetAllCustomWorkProjectsQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import React, { Suspense } from 'react'

export default async function CustomPage({
  params
}: {
  params: { slug: string }
}) {
  const client = getClient()

  const data = await client.query<GetAllCustomWorkProjectsQuery>({
    query: GetAllCustomWorkProjectsDocument,
    variables: { slug: `${params.slug}` },
    context: {
      fetchOptions: {
        next: { tags: [params.slug] }
      }
    }
  })

  function CustomWorkPageFallBack() {
    return <p>placeholder</p>
  }
  return (
    <Suspense fallback={<CustomWorkPageFallBack />}>
      <CustomWorkPage data={data.data} />
    </Suspense>
  )
}
