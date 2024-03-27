'use client'
import { GetAllProjectsQuery } from '@/graphql/generated/graphql'
import s from './WorkPage.module.scss'
import { useEffect, useState } from 'react'
import { PageHeader } from '../page-header/PageHeader'
import { ProjectScroller } from './project-scroller/ProjectScroller'

export const WorkPage = ({ data }: { data: GetAllProjectsQuery }) => {
  const [categories, setAllCategories] = useState<string[]>([])

  const getAllCategories = () => {
    let tempCats: string[] = []
    data.allProjects.map((project) => {
      tempCats.push(`${project.category}`)
    })

    setAllCategories(tempCats)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  if (!data) return <></>

  return (
    <div>
      {/* <PageHeader title="Work" categories={categories} /> */}
      <ProjectScroller data={data} />
    </div>
  )
}
