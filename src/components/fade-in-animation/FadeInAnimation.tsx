import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import s from './FadeInAnimation.module.scss'

const isInViewport = (el: HTMLElement | null) => {
  if (!el) {
    return false
  }
  const rect = el.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

const getScrollParent: (el: HTMLElement | null) => HTMLElement | null = (
  node
) => {
  const isElement = node instanceof HTMLElement
  const overflowY = isElement && window.getComputedStyle(node).overflowY
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'

  if (!node) {
    return null
  } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node
  }

  return getScrollParent(node.parentElement) || document.body
}

export const FadeInAnimation = ({
  children,
  delay = 0,
  scrollParent
}: {
  children: React.ReactNode
  delay?: number
  scrollParent?: HTMLElement
}) => {
  const fadeInSection = useRef<HTMLDivElement | null>(null)

  useGSAP((context, contextSafe) => {
    if (!contextSafe) {
      return
    }

    let hasRun = false

    const _scrollParent = scrollParent ?? window

    const fadeIn = contextSafe((delay: number) => {
      if (isInViewport(fadeInSection.current) && !hasRun) {
        gsap.to(fadeInSection.current, {
          duration: 1,
          opacity: 1,
          delay,
          y: 0
        })
        hasRun = true
      }
    })

    const onScroll = () => {
      fadeIn(0)
    }

    _scrollParent.addEventListener('scroll', onScroll as EventListener)

    fadeIn(delay)

    return () => {
      _scrollParent.removeEventListener('scroll', onScroll as EventListener)
      hasRun = false
    }
  })

  return (
    <div ref={fadeInSection} className={s.fadeInSection}>
      {children}
    </div>
  )
}
