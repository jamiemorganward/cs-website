import { getClient } from '@/lib/serverClient'

export default async function ProjectPage() {
  const client = getClient()
  const data = await client.query
  return (
    <>
      <main></main>
    </>
  )
}
