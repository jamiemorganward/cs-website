import React, { useEffect, useRef, useState } from 'react'
import s from './NextProjectHolder.module.scss'
import { NextProjectFragment } from '@/graphql/generated/graphql'
import { ProjectIntro } from '../project-intro/ProjectIntro'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { useWindowSize } from '@/utils/useWindowSize'

export const NextProjectHolder = ({
  project
}: {
  project: NextProjectFragment
}) => {
  const windowSize = useWindowSize()
  // Animation for card scroll in
  gsap.registerPlugin(ScrollTrigger)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.to(cardRef.current, {
      transform: 'rotate(4.195deg)'
    })

    ScrollTrigger.create({
      trigger: cardRef.current,
      animation: tl,
      start: 'top bottom',
      end: () => `+=${window.innerHeight * 0.8 - 4 * 13}px`,
      scrub: 0
    })
  }, [windowSize?.width])

  // Cursor animation logic

  const cursorRef = useRef<HTMLDivElement | null>(null)

  const onMove = (e: any) => {
    if (cursorRef.current && cardRef.current) {
      gsap.killTweensOf(cursorRef.current)
      const containerRect = cardRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      const buttonWidth = cursorRef.current.offsetWidth
      const buttonHeight = cursorRef.current.offsetHeight
      const buttonX = mouseX - buttonWidth / 2
      const buttonY = mouseY - buttonHeight / 2

      const maxButtonX = containerRect.width - buttonWidth
      const maxButtonY = containerRect.height - buttonHeight

      const tl = gsap.timeline()

      tl.to(cursorRef.current, {
        duration: 0.1,
        overwrite: 'auto',
        x: Math.min(Math.max(buttonX, 0), maxButtonX),
        y: Math.min(Math.max(buttonY, 0), maxButtonY),
        stagger: 0.1,
        ease: 'Power1.ease'
      })
      tl.to(cursorRef.current, { opacity: 1 }, '<')
    }
  }

  const onLeave = (e: any) => {
    if (cursorRef.current && cardRef.current) {
      gsap.killTweensOf(cursorRef.current)
      const tl = gsap.timeline()
      tl.to(cursorRef.current, { opacity: 0, duration: 0.1 })
      tl.to(
        cursorRef.current,
        {
          duration: 0.5,
          x: (cardRef.current.clientWidth - cursorRef.current.clientWidth) / 2,
          y: (cardRef.current.clientHeight - cursorRef.current.clientHeight) / 2
        },
        '<1'
      )
    }
  }

  useEffect(() => {
    const container = cardRef.current
    console.log(container, cursorRef.current)

    if (!container || !cursorRef.current) return

    gsap.set(cursorRef.current, {
      x: (container.clientWidth - cursorRef.current.clientWidth) / 2,
      y: (container.clientHeight - cursorRef.current.clientHeight) / 2
    })

    container?.addEventListener('mousemove', (e) => onMove(e))
    container?.addEventListener('mouseenter', (e) => onMove(e))
    container?.addEventListener('mouseleave', (e) => onLeave(e))

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseenter', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [windowSize.width])

  if (!windowSize.width) return <></>

  return (
    <Link href={`/work/${project.slug}`} className={s.nextProjectHolder}>
      <div className={s.card} ref={cardRef}>
        <div className={s.cursor} ref={cursorRef}>
          <p>Next Project</p>
        </div>
        <ProjectIntro
          title={`${project.projectHeadline}`}
          year={`${project.year}`}
          client={`${project.client}`}
          description={`${project.projectDescription}`}
          ourRole={`${project.ourRole}`}
          link={`${project.projectUrl}`}
        />
        <img
          src={`${project.openGraphImage?.responsiveImage?.src}`}
          alt={`${project.openGraphImage?.responsiveImage?.alt}`}
          className={s.image}
        />
      </div>
    </Link>
  )
}
