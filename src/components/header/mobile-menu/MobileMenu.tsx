import s from './MobileMenu.module.scss'
import { usePathname } from 'next/navigation'
import { client } from '@/lib/datocms'
import {
  GetLatestProjectDocument,
  ProjectThumbFragment
} from '@/graphql/generated/graphql'
import { useEffect, useState } from 'react'
import TransitionLink from '@/components/transition-link/TransitionLink'

export const MobileMenu = ({
  open,
  changedPath
}: {
  open: boolean
  changedPath: () => void
}) => {
  const pathname = usePathname()

  const [latestProject, setLatestProject] = useState<ProjectThumbFragment>()
  const [isCopied, setIsCopied] = useState(false)

  const getLatestProject = async () => {
    const data = await client.query({
      query: GetLatestProjectDocument
    })
    setLatestProject(data.data.allProjects[0])
  }

  useEffect(() => {
    getLatestProject()
  }, [])

  useEffect(() => {
    changedPath()
  }, [pathname])

  useEffect(() => {
    if (isCopied) {
      navigator.clipboard.writeText('hello@clicksuite.co.nz')
    }
  }, [isCopied])

  const isActive = (href: string) => pathname === href

  if (!open) return <></>

  return (
    <>
      <div className={`${s.mobileMenu} ${open ? s.open : ''}`}>
        <div className={`${s.menuWrapper}`}>
          <nav className={s.menu}>
            <TransitionLink
              className={`${s.link} ${
                pathname.includes('/work') ? s.active : ''
              }`}
              href={'/work'}
            >
              Work
            </TransitionLink>
            <TransitionLink
              className={`${s.link} ${isActive('/people') ? s.active : ''}`}
              href={'/people'}
            >
              People
            </TransitionLink>
            <TransitionLink
              className={`${s.link} ${isActive('/approach') ? s.active : ''}`}
              href={'/approach'}
            >
              Approach
            </TransitionLink>
            <TransitionLink
              className={`${s.link} ${isActive('/about') ? s.active : ''}`}
              href={'/about'}
            >
              About
            </TransitionLink>
            {/* Hidden for now */}
            {/* <TransitionLink
              className={`${s.link} ${isActive('/rd') ? s.active : ''}`}
              href={'/rd'}
            >
              Playground
            </TransitionLink> */}
            <TransitionLink
              className={`${s.link} ${isActive('/contact') ? s.active : ''}`}
              href={'/contact'}
            >
              Contact
            </TransitionLink>
          </nav>
        </div>
        <div className={s.bottomSection}>
          {latestProject && (
            <a className={s.latest} href={`${latestProject.projectUrl}`}>
              <div className={s.projectThumb}>
                <img
                  src={`${latestProject.featuredImage?.responsiveImage?.src}`}
                />
                <span>Latest Project</span>
              </div>
            </a>
          )}
          <div className={s.contact} onClick={() => setIsCopied(!isCopied)}>
            <p>{isCopied ? 'Copied!' : 'hello@clicksuite.co.nz'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
