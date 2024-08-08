'use client'
import React from 'react'
import s from './PeoplePage.module.scss'
import { PageTitle } from '../page-title/PageTitle'
import { GetAllPeopleQuery } from '@/graphql/generated/graphql'
import { PersonCard } from './person-card/PersonCard'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { Parallax } from '../parallax/Parallax'
import { EmailSelection } from '../about-page/email-selection/EmailSelection'

export const PeoplePage = ({ data }: { data: GetAllPeopleQuery }) => {
  const margins = [
    { top: 0, right: 0, bottom: 0, left: 0 },
    { top: 10, right: 0, bottom: 0, left: 0 },
    { top: 8, right: 0, bottom: 0, left: 0 },
    { top: 10, right: 0, bottom: 0, left: 10 },
    { top: 12, right: 10, bottom: 0, left: 5 },
    { top: -5, right: 0, bottom: 0, left: 35 }
  ]

  return (
    <div className={s.peoplePageWrapper}>
      <PageTitle title="People" />
      <ReactLenis root>
        <div className={s.personCardWrapper}>
          {data.allPeople.map((person, i) => {
            return (
              <Parallax key={i} className="" id={'s'} speed={0.2 - i / 2}>
                <PersonCard person={person} margins={margins[i]} />
              </Parallax>
            )
          })}
        </div>
        <EmailSelection />
      </ReactLenis>
    </div>
  )
}
