import Link from 'next/link'
import s from './ProjectIntro.module.scss'
import View from '@/lottie-files/view-live-website.json'
import Lottie from 'react-lottie'
import { useState } from 'react'

interface ProjectInfoTypes {
  title: string
  client: string

  multiCategory: string[]
  service: string
  platform: string
  link: string
  year: string
}

export const ProjectIntro = ({
  title,
  client,

  multiCategory,
  service,
  platform,
  link,
  year
}: ProjectInfoTypes) => {
  const [isStopped, setIsStopped] = useState(true)

  const animOptions = {
    loop: true,
    autoplay: false,
    animationData: View,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className={s.projectIntro}>
      <div className={s.projectTitle}>
        <h1>{title}</h1>
      </div>
      <div className={s.projectInfo}>
        <div className={s.attributesTable}>
          <div className={s.row}>
            <div className={s.label}>Client</div>
            <div className={s.value}>{client}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Category</div>
            <div className={s.value}>
              {multiCategory.map((cat, i) => {
                if (i < multiCategory.length - 1) {
                  return `${cat}, `
                } else {
                  return `${cat}`
                }
              })}
            </div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Service</div>
            <div className={s.value}>{service}</div>
          </div>
          {platform && (
            <div className={s.row}>
              <div className={s.label}>Platform</div>
              <div className={s.value}>{platform}</div>
            </div>
          )}
        </div>
        {link && (
          <div className={s.url}>
            <Link
              href={link}
              target="_blank"
              onMouseEnter={() => setIsStopped(false)}
              onMouseLeave={() => setIsStopped(true)}
            >
              <span>View Live Website</span>
              <div className={s.animationWrapper}>
                <Lottie options={animOptions} isStopped={isStopped} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
