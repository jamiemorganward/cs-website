'use client'
import s from './Header.module.scss'
import Link from 'next/link'
import { LogoWrapper } from '../logo-wrapper/LogoWrapper'
import { useWindowSize } from '@/utils/useWindowSize'
import { DesktopMenu } from './desktop-menu/DesktopMenu'
import { MobileMenu } from './mobile-menu/MobileMenu'
import { useEffect, useState } from 'react'
import { HamburgerButton } from './hamburger-button/HamburgerButton'
import TransitionLink from '../transition-link/TransitionLink'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [sticky, setSticky] = useState<boolean>()

  const route = usePathname()

  // const stickyMagic = () => {
  //   if (window.scrollY > 100) {
  //     setSticky(true)
  //   } else {
  //     setSticky(false)
  //   }
  // }
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', stickyMagic)
  //   }
  // }, [])

  useEffect(() => {
    if (windowSize.width && windowSize.width < 991) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
      setOpen(false)
    }
  }, [windowSize.width])

  if (isMobile === undefined) return <></>

  return (
    <>
      <header
        className={`${s.headerWrapper} ${isMobile ? s.mobile : s.desktop} ${
          route === '/' && s.home
        } ${open ? s.open : ''} ${sticky ? s.sticky : ''}`}
      >
        <div className={s.container}>
          <div className={s.headerInner}>
            <div className={s.topSection}>
              <TransitionLink href={'/'}>
                <LogoWrapper dark={isMobile && open} />
              </TransitionLink>
              {isMobile ? (
                <HamburgerButton
                  open={open}
                  onClick={() => setOpen(!open)}
                  dark={isMobile && open}
                />
              ) : (
                <DesktopMenu sticky={sticky} />
              )}
            </div>
            {isMobile && (
              <MobileMenu open={open} changedPath={() => setOpen(false)} />
            )}
          </div>
        </div>
      </header>
      <div className={`${s.background} ${open && s.open}`}></div>
    </>
  )
}
