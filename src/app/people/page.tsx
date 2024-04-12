import { PeoplePage } from '@/components/people-page/PeoplePage'
import {
  GetAllPeopleDocument,
  GetAllPeopleQuery
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'
import React from 'react'

export default async function Page() {
  const client = getClient()
  const data = await client.query<GetAllPeopleQuery>({
    query: GetAllPeopleDocument
  })
  return <PeoplePage data={data.data} />
}
