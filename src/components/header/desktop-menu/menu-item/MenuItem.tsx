import s from './MenuItem.module.scss'
import { usePathname } from 'next/navigation'
import CloseIcon from '../../../../assets/svgs/close.svg'
import { PageInfoContext } from '@/lib/contexts/PageInfoContext'
import { useContext, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import TransitionLink from '@/components/transition-link/TransitionLink'
import { useTransitionRouter } from '@/lib/pageTransitions'

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
  const router = useTransitionRouter()
  const ctx = useContext(PageInfoContext)
  const pathname = usePathname()

  const isActive = (link: string) => pathname.includes(link)
  const showPill = (link: string) => pathname.includes(`${link}/`)
  const linkRef = useRef<HTMLButtonElement | null>(null)
  const lineRef = useRef<HTMLSpanElement | null>(null)
  const pillRef = useRef<HTMLDivElement | null>(null)
  const [hovering, setHovering] = useState(false)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (hasSubMenuPill) {
      animateIn()
    }
  }, [pathname])

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

  const animateOut = () => {
    if (!hasSubMenuPill || !showPill(link)) {
      router.push(link)
    } else if (hasSubMenuPill && showPill(link)) {
      router.push(link)
      gsap.to(pillRef.current, {
        width: 0,
        opacity: 0
      })
    }
  }

  const animateIn = () => {
    gsap.to(pillRef.current, {
      width: 'auto',
      opacity: 1
    })
  }

  return (
    <button
      onMouseEnter={() => !isActive(link) && hoverIn()}
      onMouseLeave={() => !isActive(link) && hoverOut()}
      className={`${s.link} ${sticky ? s.sticky : ''} ${
        isActive(link) ? s.active : ''
      }`}
      ref={linkRef}
      onClick={animateOut}
    >
      <div className={s.linkText}>
        {text}
        <span ref={lineRef} className={s.linkHoverLine}></span>
        {isActive(link) && <span className={s.linkActiveLine}></span>}
      </div>
      {hasSubMenuPill && showPill(link) && (
        <span
          className={s.parentWrapper}
          ref={pillRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <span className={s.submenuPill}>
            {subMenuText ? subMenuText : ctx.projectName ? ctx.projectName : ''}
            <div className={s.close}>
              <CloseIcon color={hovering ? '#17191a' : '#fff'} />
            </div>
          </span>
        </span>
      )}

      <span className={s.linkBg}></span>
    </button>
  )
}
