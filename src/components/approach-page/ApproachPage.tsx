'use client'
import React from 'react'
import s from './ApproachPage.module.scss'
import { useWindowSize } from '@/utils/useWindowSize'
import { ApproachPageDesktop } from './approach-page-desktop/ApproachPageDesktop'
import { ApproachPageMobile } from './approach-page-mobile/ApproachPageMobile'

export const ApproachPage = () => {
  const windowSize = useWindowSize()

  if (!windowSize.width) return <></>

  return (
    <>
      {windowSize.width > 991 && <ApproachPageDesktop />}
      {windowSize.width < 991 && <ApproachPageMobile />}
    </>
  )
}
