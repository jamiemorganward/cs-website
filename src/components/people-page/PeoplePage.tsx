import React from 'react'
import s from './PeoplePage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { GetAllPeopleQuery } from '@/graphql/generated/graphql'
import { PersonCard } from './person-card/PersonCard'

export const PeoplePage = ({ data }: { data: GetAllPeopleQuery }) => {
  return (
    <div className={s.peoplePageWrapper}>
      <PageTitle title="People" />
      <div className={s.personCardWrapper}>
        {data.allPeople.map((person, i) => {
          return <PersonCard key={i} person={person} />
        })}
      </div>
    </div>
  )
}
