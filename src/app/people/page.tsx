import { PeoplePage } from '@/components/people-page/PeoplePage'
import {
  GetAllPeopleDocument,
  GetAllPeopleQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'People | ClickSuite'
}

export default async function Page() {
  const client = getClient()
  const data = await client.query<GetAllPeopleQuery>({
    query: GetAllPeopleDocument
  })
  return <PeoplePage data={data.data} />
}
