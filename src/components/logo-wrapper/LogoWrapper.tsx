import React from 'react'
import s from './LogoWrapper.module.scss'
import CS from '../../assets/svgs/clicksuite.svg'
import Image from 'next/image'

export const LogoWrapper = () => {
  return (
    <div className={s.logoWrapper}>
      <CS alt="ClickSuite Logo" />
    </div>
  )
}
