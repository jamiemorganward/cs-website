'use client'
import { DesktopMenu } from '../header/desktop-menu/DesktopMenu'
import s from './Footer.module.scss'
import LogoText from '../../assets/svgs/logo-text.svg'
import { HeartCanvas } from '../heart-animation/HeartCanvas'
import { usePathname, useRouter } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()

  if (pathname === '/') return <></>
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
        <HeartCanvas />
      </div>
    </div>
  )
}
