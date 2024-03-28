'use client'
import { useRef, useState } from 'react'
import s from './PageTitle.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export const PageTitle = ({
  title,
  dark
}: {
  title: string
  dark?: boolean
}) => {
  return (
    <div className={s.pageTitleWrapper}>
      <h1 className={s.pageTitle}>{title}</h1>
    </div>
  )
}
