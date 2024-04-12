'use client'
import React from 'react'
import s from './PeoplePage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { GetAllPeopleQuery } from '@/graphql/generated/graphql'
import { PersonCard } from './person-card/PersonCard'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

export const PeoplePage = ({ data }: { data: GetAllPeopleQuery }) => {
  const margins = [
    { top: 0, right: 0, bottom: 0, left: 0 },
    { top: 20, right: 0, bottom: 0, left: 0 },
    { top: 8, right: 0, bottom: 0, left: 0 },
    { top: 0, right: 0, bottom: 0, left: 10 },
    { top: 6, right: 10, bottom: 0, left: 5 },
    { top: 0, right: 14, bottom: 0, left: 16 }
  ]

  return (
    <div className={s.peoplePageWrapper}>
      <PageTitle title="People" />
      <ReactLenis root>
        <div className={s.personCardWrapper}>
          {data.allPeople.map((person, i) => {
            return <PersonCard key={i} person={person} margins={margins[i]} />
          })}
        </div>
      </ReactLenis>
    </div>
  )
}
