import Link from 'next/link'
import s from './ProjectIntro.module.scss'

interface ProjectInfoTypes {
  title: string
  client: string
  category: string
  service: string
  platform: string
  link: string
  year: string
}

export const ProjectIntro = ({
  title,
  client,
  category,
  service,
  platform,
  link,
  year
}: ProjectInfoTypes) => {
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
            <div className={s.value}>{category}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Service</div>
            <div className={s.value}>{service}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Platform</div>
            <div className={s.value}>{platform}</div>
          </div>
        </div>
        <div className={s.url}>
          <Link href={link} target="_blank">
            View Live Website
          </Link>
        </div>
      </div>
    </div>
  )
}
