import { ApproachPage } from '@/components/approach-page/ApproachPage'
import {
  ApproachPageDocument,
  ApproachPageQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Approach | ClickSuite'
}

export default async function Page() {
  const client = getClient()
  const data = await client.query<ApproachPageQuery>({
    query: ApproachPageDocument
  })
  if (!data.data.approachPage) return <></>
  return <ApproachPage data={data.data.approachPage} />
}
