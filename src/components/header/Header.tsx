'use client'
import s from './Header.module.scss'
import Link from 'next/link'
import { LogoWrapper } from '../logo-wrapper/LogoWrapper'
import { usePathname } from 'next/navigation'
import CloseIcon from '../../assets/svgs/close.svg'

export const Header = () => {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <header className={s.headerWrapper}>
      <div className={s.headerInner}>
        <Link href={'/'}>
          <LogoWrapper />
        </Link>
        <div className={s.menuWrapper}>
          <nav className={s.menu}>
            <Link
              className={`${s.link} ${isActive('/work') && s.active}`}
              href={'/work'}
            >
              Work{' '}
              <span className={s.submenuItem}>
                Name of project
                <i className={s.close}>
                  <CloseIcon />
                </i>
              </span>
            </Link>
            <Link
              className={`${s.link} ${isActive('/people') && s.active}`}
              href={'/people'}
            >
              People
            </Link>
            <Link
              className={`${s.link} ${isActive('/about') && s.active}`}
              href={'/about'}
            >
              About
            </Link>
            <Link
              className={`${s.link} ${isActive('/rd') && s.active}`}
              href={'/rd'}
            >
              Playground
            </Link>
            <Link
              className={`${s.link} ${isActive('/contact') && s.active}`}
              href={'/contact'}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
