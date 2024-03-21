import s from './DesktopMenu.module.scss'
import CloseIcon from '../../../assets/svgs/close.svg'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'

export const DesktopMenu = () => {
  const pathname = usePathname()
  const router = useRouter()
  const ctx = useContext(PageInfoContext)

  const isActive = (href: string) => pathname === href

  return (
    <div className={s.menuWrapper}>
      <nav className={s.menu}>
        <Link
          className={`${s.link} ${pathname.includes('/work') ? s.active : ''}`}
          href={'/work'}
        >
          <span className={s.linkInner}>Work</span>
          {pathname.includes('/work/') && (
            <span className={s.submenuPill}>
              {ctx.projectName}
              <button className={s.close} onClick={() => router.back}>
                <CloseIcon />
              </button>
            </span>
          )}
        </Link>
        <Link
          className={`${s.link} ${isActive('/people') ? s.active : ''}`}
          href={'/people'}
        >
          <span className={s.linkInner}>People</span>
        </Link>
        <Link
          className={`${s.link} ${isActive('/about') ? s.active : ''}`}
          href={'/about'}
        >
          <span className={s.linkInner}>About</span>
        </Link>
        <Link
          className={`${s.link} ${isActive('/rd') ? s.active : ''}`}
          href={'/rd'}
        >
          <span className={s.linkInner}>Playground</span>
        </Link>
        <Link
          className={`${s.link} ${isActive('/contact') ? s.active : ''}`}
          href={'/contact'}
        >
          <span className={s.linkInner}>Contact</span>
        </Link>
      </nav>
    </div>
  )
}
