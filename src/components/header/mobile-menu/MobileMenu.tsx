import s from './MobileMenu.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { client } from '@/lib/datocms'
import {
  GetLatestProjectDocument,
  ProjectThumbFragment
} from '@/graphql/generated/graphql'
import { useEffect, useState } from 'react'

export const MobileMenu = ({
  open,
  onClose
}: {
  open: boolean
  onClose?: () => void
}) => {
  const pathname = usePathname()

  const [latestProject, setLatestProject] = useState<ProjectThumbFragment>()

  const getLatestProject = async () => {
    const data = await client.query({
      query: GetLatestProjectDocument
    })
    setLatestProject(data.data.allProjects[0])
  }

  useEffect(() => {
    getLatestProject()
  }, [])

  const isActive = (href: string) => pathname === href

  if (!open) return <></>

  return (
    <>
      <div className={s.menuWrapper}>
        <nav className={s.menu}>
          <Link
            className={`${s.link} ${
              pathname.includes('/work') ? s.active : ''
            }`}
            href={'/work'}
            onClick={onClose}
          >
            Work
          </Link>
          <Link
            className={`${s.link} ${isActive('/people') ? s.active : ''}`}
            href={'/people'}
            onClick={onClose}
          >
            People
          </Link>
          <Link
            className={`${s.link} ${isActive('/about') ? s.active : ''}`}
            href={'/about'}
            onClick={onClose}
          >
            About
          </Link>
          <Link
            className={`${s.link} ${isActive('/rd') ? s.active : ''}`}
            href={'/rd'}
            onClick={onClose}
          >
            Playground
          </Link>
          <Link
            className={`${s.link} ${isActive('/contact') ? s.active : ''}`}
            href={'/contact'}
            onClick={onClose}
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className={s.bottomSection}>
        {latestProject && (
          <a className={s.latest} href={`${latestProject.projectUrl}`}>
            <div className={s.projectThumb}>
              <img
                src={`${latestProject.featuredMedia?.responsiveImage?.src}`}
              />
            </div>
            Latest Project:
            <br />
            <span>{latestProject.projectName}</span>
          </a>
        )}
        <div className={s.contact}>
          <Link href={'mailto: hello@clicksuite.co.nz'}>
            hello@clicksuite.co.nz
          </Link>
        </div>
      </div>
    </>
  )
}
