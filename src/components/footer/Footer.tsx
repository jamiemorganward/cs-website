'use client'
import { DesktopMenu } from '../header/desktop-menu/DesktopMenu'
import s from './Footer.module.scss'
import LogoText from '../../assets/svgs/logo-text.svg'
import { HeartAnimation } from '../heart-animation/HeartAnimation'
import { HeartCanvas4 } from '../heart-animation/HeartCanvas4'

export const Footer = () => {
  return (
    <div className={s.footer}>
      <div className={s.topSection}>
        <div className={s.logo}>
          <LogoText />
        </div>
        <div className={s.menu}>
          <DesktopMenu />
        </div>
      </div>
      <div className={s.interactiveBit}>
        {/* <HeartAnimation /> */}
        <HeartCanvas4 />
      </div>
    </div>
  )
}
