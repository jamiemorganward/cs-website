import s from './PageHeader.module.scss'
import { FilterBar } from '../filter-bar/FilterBar'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export const PageHeader = ({
  title,
  categories
}: {
  title: string
  categories: string[]
}) => {
  const titleRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const headerInnerRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState<boolean | null>(false)

  // cannot get this to work with gsap

  // gsap.registerPlugin(ScrollTrigger)
  // gsap.registerPlugin(useGSAP)

  // useGSAP(() => {
  //   ScrollTrigger.create({
  //     scrub: true,
  //     pin: true,
  //     trigger: headerRef.current,
  //     start: 'top 10%',
  //     // end: '+=50000vh',
  //     end: document.body.scrollHeight,
  //     markers: true,
  //     pinSpacing: true,
  //     anticipatePin: 2
  //   })
  // }, [headerRef])

  // doing this instead of gsap (for now?)

  const stickyMagic = () => {
    if (window.scrollY > 85) {
      setScrolled(true)
    } else if (window.scrollY < 85) {
      setScrolled(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', stickyMagic)
    }
  }, [])

  return (
    <div
      ref={headerRef}
      className={`${s.header} ${scrolled ? s.scrolled : ''}`}
    >
      <div ref={headerInnerRef}>
        <h1 ref={titleRef} className={s.pageTitle}>
          {title}
        </h1>
        <div ref={filterRef}>
          <FilterBar filterItems={categories} />
        </div>
      </div>
    </div>
  )
}
