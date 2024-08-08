'use client'
import React, { useState } from 'react'
import s from './SeeAllSites.module.scss'
import Link from 'next/link'
import View from '@/lottie-files/view-live-website.json'
import Lottie from 'react-lottie'

export const SeeAllSites = () => {
  const [isStopped, setIsStopped] = useState(true)

  const animOptions = {
    loop: false,
    autoplay: false,
    animationData: View,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className={s.projectIntro}>
      <div className={s.projectInfo}>
        <Link
          href={'/work'}
          onMouseEnter={() => setIsStopped(false)}
          onMouseLeave={() => setIsStopped(true)}
        >
          <span>View All Projects</span>
          <div className={s.animationWrapper}>
            <Lottie options={animOptions} isStopped={isStopped} />
          </div>
        </Link>
      </div>
    </div>
  )
}
