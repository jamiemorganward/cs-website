'use client'
import { DesktopMenu } from '../header/desktop-menu/DesktopMenu'
import s from './Footer.module.scss'
import LogoText from '../../assets/svgs/logo-text.svg'
import { HeartAnimation } from '../heart-animation/HeartAnimation'
import { HeartCanvas4 } from '../heart-animation/HeartCanvas4'
import { HeartCanvas } from '../heart-animation/HeartCanvas'
import { HeartCanvas2 } from '../heart-animation/HeartCanvas2'
import { HeartCanvas3 } from '../heart-animation/HeartCanvas3'
import { HeartThreeJs } from '../heart-animation/HeartThreeJs'
import HeartCanvas5 from '../heart-animation/HeartCanvas5'
import { HeartCanvas6 } from '../heart-animation/HeartCanvas6'
import { HeartCanvas7 } from '../heart-animation/HeartCanvas7'

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
        <HeartCanvas4 />
      </div>
    </div>
  )
}
