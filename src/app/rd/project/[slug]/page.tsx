import { RDProjectPage } from '@/components/rd-project-page/RDProjectPage'
import {
  GetRdProjectDocument,
  GetRdProjectQuery,
  GetRdProjectQueryVariables
} from '@/graphql/generated/graphql'
import { getClient } from '@/lib/serverClient'

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient()
  const data = await client.query<
    GetRdProjectQuery,
    GetRdProjectQueryVariables
  >({
    query: GetRdProjectDocument,
    variables: { slug: `/${params.slug}` },
    context: {
      fetchOptions: {
        next: { tags: [params.slug] }
      }
    }
  })
  return <RDProjectPage data={data.data} />
}
