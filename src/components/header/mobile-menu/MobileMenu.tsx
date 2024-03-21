import s from './MobileMenu.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const MobileMenu = ({ open }: { open: boolean }) => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  if (!open) return <></>

  return (
    <>
      <div className={s.menuWrapper}>
        <nav className={s.menu}>
          <Link
            className={`${s.link} ${
              pathname.includes('/work') ? s.active : ''
            }`}
            href={'/work'}
          >
            Work
          </Link>
          <Link
            className={`${s.link} ${isActive('/people') ? s.active : ''}`}
            href={'/people'}
          >
            People
          </Link>
          <Link
            className={`${s.link} ${isActive('/about') ? s.active : ''}`}
            href={'/about'}
          >
            About
          </Link>
          <Link
            className={`${s.link} ${isActive('/rd') ? s.active : ''}`}
            href={'/rd'}
          >
            Playground
          </Link>
          <Link
            className={`${s.link} ${isActive('/contact') ? s.active : ''}`}
            href={'/contact'}
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className={s.bottomSection}>
        <div className={s.latest}>
          <div className={s.projectThumb}></div>
          Latest Project
        </div>
        <div className={s.contact}>
          <Link href={'mailto: hello@clicksuite.co.nz'}>
            hello@clicksuite.co.nz
          </Link>
        </div>
      </div>
    </>
  )
}
