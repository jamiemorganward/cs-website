'use client'
import { GetProjectQuery } from '@/graphql/generated/graphql'
import { useContext, useEffect } from 'react'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'

export const ProjectPage = ({ data }: { data: GetProjectQuery }) => {
  const ctx = useContext(PageInfoContext)

  useEffect(() => {
    ctx.setProjectName(`${data.project?.projectName}`)
    return () => {
      // isUnmounted
      ctx.setProjectName('')
    }
  }, [data])

  // To do: pass on data.data.project and figure out typing issue
  console.log(data.project)
  return (
    <>
      <main>{data?.project?.projectName}</main>
    </>
  )
}
