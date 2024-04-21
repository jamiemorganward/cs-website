import { ProjectPage } from '@/components/project-page/ProjectPage'
import {
  GetProjectDocument,
  GetProjectQuery,
  GetProjectQueryVariables
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Work | ClickSuite'
}

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient()
  const data = await client.query<GetProjectQuery, GetProjectQueryVariables>({
    query: GetProjectDocument,
    variables: { slug: `/${params.slug}` },
    context: {
      fetchOptions: {
        next: { tags: [params.slug] }
      }
    }
  })

  // To do: pass on data.data.project and figure out typing issue
  return <ProjectPage data={data.data} />
}
