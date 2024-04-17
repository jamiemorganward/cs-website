import React from 'react'
import s from './LogoWrapper.module.scss'
import CSLogo from '@/assets/svgs/cs-logo-mask.svg'

import Lottie from 'lottie-react'
import LogoAnimation from '../../assets/animations/LogoAnimation.json'

export const LogoWrapper = ({ dark }: { dark: boolean }) => {
  return (
    <div className={`${s.logoWrapper} ${dark ? s.dark : ''}`}>
      {/* <Lottie animationData={LogoAnimation} /> */}
      <CSLogo />
    </div>
  )
}
