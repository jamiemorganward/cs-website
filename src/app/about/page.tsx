import { AboutPage } from '@/components/about-page/AboutPage'
import { AboutPageDocument, AboutPageQuery } from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About | ClickSuite'
}

export default async function Page() {
  const client = getClient()
  const data = await client.query<AboutPageQuery>({
    query: AboutPageDocument
  })
  if (!data.data.aboutPage) return <></>
  return <AboutPage data={data.data.aboutPage} />
}
