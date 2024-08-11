import { ProjectPage } from '@/components/project-page/ProjectPage'
import {
  GetProjectDocument,
  GetProjectQuery,
  GetProjectQueryVariables
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  return {
    title: data.data.project?.client + ' | ClickSuite',
    description: data.data.project?.metaDescription,
    openGraph: {
      images: [data.data.project?.openGraphImage?.responsiveImage?.src || '']
    }
  }
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
