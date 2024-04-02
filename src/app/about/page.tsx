import { AboutPage } from '@/components/about-page/AboutPage'
import { AboutPageDocument, AboutPageQuery } from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import React from 'react'

export default async function Page() {
  const client = getClient()
  const data = await client.query<AboutPageQuery>({
    query: AboutPageDocument
  })
  if (!data.data.aboutPage) return <></>
  return <AboutPage data={data.data.aboutPage} />
}
