import Link from 'next/link'
import s from './MenuItem.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import CloseIcon from '../../../../assets/svgs/close.svg'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { useContext, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const lineRef = useRef<HTMLSpanElement | null>(null)

  gsap.registerPlugin(useGSAP)

  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5 } })
  let exitTime = 0

  useGSAP(() => {
    reset()
    tl.to(lineRef.current, { width: '100%' })
    tl.addPause('exit')
    exitTime = tl.duration()
    tl.to(lineRef.current, { x: '100%' })
  }, [{ lineRef, linkRef }])

  const reset = () => {
    gsap.set(lineRef.current, {
      width: '0%',
      transformOrigin: 'left center',
      x: 0
    })
  }

  const hoverIn = () => {
    if (tl.time() < exitTime) {
      reset()
      tl.play()
    } else {
      tl.restart()
    }
  }

  const hoverOut = () => {
    if (tl.time() < exitTime) {
      tl.reverse()
    } else {
      tl.play()
    }
  }

  return (
    <Link
      onMouseEnter={() => !isActive(link) && hoverIn()}
      onMouseLeave={() => !isActive(link) && hoverOut()}
      className={`${s.link} ${sticky ? s.sticky : ''} ${
        isActive(link) ? s.active : ''
      }`}
      href={link}
      ref={linkRef}
    >
      <div className={s.linkText}>
        {text}
        <span ref={lineRef} className={s.linkHoverLine}></span>
        {isActive(link) && <span className={s.linkActiveLine}></span>}
      </div>
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
