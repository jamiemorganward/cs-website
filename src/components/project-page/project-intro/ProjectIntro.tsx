import Link from 'next/link'
import s from './ProjectIntro.module.scss'
import View from '@/lottie-files/view-live-website.json'
import Lottie from 'react-lottie'
import { useState } from 'react'

interface ProjectInfoTypes {
  title: string
  client: string
  description: string
  ourRole: string
  link: string
  year: string
}

export const ProjectIntro = ({
  title,
  client,
  description,
  ourRole,
  link,
  year
}: ProjectInfoTypes) => {
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
      <div className={s.projectTitle}>
        <h1>{title}</h1>
      </div>
      <div className={s.projectInfo}>
        <div className={s.attributesTable}>
          <div className={s.row}>
            <div className={s.label}>Client</div>
            <div className={s.value}>{client}</div>
          </div>
          {description && (
            <div className={s.row}>
              <div className={s.label}>Project</div>
              <div className={s.value}>{description}</div>
            </div>
          )}
          {year && (
            <div className={s.row}>
              <div className={s.label}>Year</div>
              <div className={s.value}>{year}</div>
            </div>
          )}
          {ourRole && (
            <div className={s.row}>
              <div className={s.label}>Our Role</div>
              <div className={s.value}>{ourRole}</div>
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
