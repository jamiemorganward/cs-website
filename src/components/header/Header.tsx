'use client'
import s from './Header.module.scss'
import Link from 'next/link'
import { LogoWrapper } from '../logo-wrapper/LogoWrapper'
import { useWindowSize } from '@/utils/useWindowSize'
import { DesktopMenu } from './desktop-menu/DesktopMenu'
import { MobileMenu } from './mobile-menu/MobileMenu'
import { useState } from 'react'
import { HamburgerButton } from './hamburger-button/HamburgerButton'

export const Header = () => {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width && windowSize.width < 991
  const [open, setOpen] = useState<boolean>(false)

  if (isMobile === undefined) return <></>

  return (
    <header
      className={`${s.headerWrapper} ${isMobile ? s.mobile : ''} ${
        open ? s.open : ''
      }`}
    >
      <div className={s.container}>
        <div className={s.headerInner}>
          <div className={s.topSection}>
            <Link href={'/'}>
              <LogoWrapper />
            </Link>
            {isMobile ? (
              <HamburgerButton open={open} onClick={() => setOpen(!open)} />
            ) : (
              <DesktopMenu />
            )}
          </div>
          {isMobile && <MobileMenu open={open} />}
        </div>
      </div>
    </header>
  )
}
