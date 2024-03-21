import React from 'react'
import s from './LogoWrapper.module.scss'

import Lottie from 'lottie-react'
import LogoAnimation from '../../assets/animations/LogoAnimation.json'

export const LogoWrapper = () => {
  return (
    <div className={s.logoWrapper}>
      <Lottie animationData={LogoAnimation} />
    </div>
  )
}
