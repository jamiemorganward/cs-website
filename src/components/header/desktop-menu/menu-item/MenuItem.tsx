import Link from 'next/link'
import s from './MenuItem.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import CloseIcon from '../../../../assets/svgs/close.svg'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { useContext } from 'react'

export const MenuItem = ({
  text,
  link,
  hasSubMenuPill = false,
  subMenuText,
  sticky
}: {
  text: string
  link: string
  hasSubMenuPill?: boolean
  subMenuText?: boolean
  sticky: boolean | undefined
}) => {
  const router = useRouter()
  const ctx = useContext(PageInfoContext)
  const pathname = usePathname()

  const isActive = (link: string) => pathname.includes(link)
  const showPill = (link: string) => pathname.includes(`${link}/`)

  return (
    <Link
      className={`${s.link} ${sticky ? s.sticky : ''} ${
        isActive(link) ? s.active : ''
      }`}
      href={link}
    >
      <span className={s.linkText}>{text}</span>
      {hasSubMenuPill && showPill(link) && (
        <span className={s.submenuPill}>
          {subMenuText ? subMenuText : ctx.projectName ? ctx.projectName : ''}
          <button className={s.close} onClick={() => router.back}>
            <CloseIcon />
          </button>
        </span>
      )}
      <span className={s.linkBg}></span>
    </Link>
  )
}
