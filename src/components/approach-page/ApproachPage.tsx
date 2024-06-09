'use client'
import React from 'react'
import s from './ApproachPage.module.scss'
import { useWindowSize } from '@/utils/useWindowSize'
import { ApproachPageDesktop } from './approach-page-desktop/ApproachPageDesktop'
import { ApproachPageMobile } from './approach-page-mobile/ApproachPageMobile'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { ApproachPageQuery } from '@/graphql/generated/graphql'
import Lenis from '@studio-freight/lenis/types'
import { EmailSelection } from '../about-page/email-selection/EmailSelection'

export const ApproachPage = ({
  data
}: {
  data: ApproachPageQuery['approachPage']
}) => {
  const windowSize = useWindowSize()

  if (!windowSize.width) return <></>

  return (
    <>
      <ReactLenis root options={{ lerp: 0.1 }}>
        {windowSize.width >= 991 && <ApproachPageDesktop data={data} />}
        {windowSize.width < 991 && <ApproachPageMobile data={data} />}
        <EmailSelection />
      </ReactLenis>
    </>
  )
}
