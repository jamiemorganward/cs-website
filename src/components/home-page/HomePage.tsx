import React from 'react'
import s from './HomePage.module.scss'
import { LogoWrapper } from '../logo-wrapper/LogoWrapper'
import { Container } from '../container/Container'
import { IntroSection } from '../intro-section/IntroSection'

export const HomePage = () => {
  return (
    <div>
      <LogoWrapper />
      <Container>
        <IntroSection />
      </Container>
    </div>
  )
}
