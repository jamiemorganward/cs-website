import React from 'react'
import s from './LogoWrapper.module.scss'
import CSLogo from '@/assets/svgs/cs-logo-mask.svg'

import Lottie from 'lottie-react'
import LogoAnimation from '../../assets/animations/LogoAnimation.json'

export const LogoWrapper = () => {
  return (
    <div className={s.logoWrapper}>
      {/* <Lottie animationData={LogoAnimation} /> */}
      <CSLogo />
    </div>
  )
}
