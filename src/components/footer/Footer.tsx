'use client'
import { DesktopMenu } from '../header/desktop-menu/DesktopMenu'
import s from './Footer.module.scss'
import LogoText from '../../assets/svgs/logo-text.svg'

export const Footer = () => {
  return (
    <div className={s.footer}>
      <div className={s.topSection}>
        <LogoText />
        <DesktopMenu />
      </div>
      <div className={s.interactiveBit}></div>
    </div>
  )
}
