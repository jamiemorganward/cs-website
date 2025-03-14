import s from './MobileMenu.module.scss'
import { usePathname } from 'next/navigation'
import { client } from '@/lib/datocms'
import {
  FeaturedProjectFragment,
  HomePageDocument
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

  const [featuredProject, setFeaturedProject] =
    useState<FeaturedProjectFragment>()
  const [isCopied, setIsCopied] = useState(false)

  const getFeaturedProject = async () => {
    const data = await client.query({
      query: HomePageDocument
    })
    if (data.data.homePage?.featuredProject) {
      setFeaturedProject(data.data.homePage?.featuredProject)
    }
  }

  useEffect(() => {
    getFeaturedProject()
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
            <TransitionLink className={`${s.link}`} href={'/work'}>
              <p className={s.linkText}>Work</p>
              <span
                className={`${pathname.includes('/work') ? s.active : ''}`}
              ></span>
            </TransitionLink>
            <TransitionLink className={`${s.link}`} href={'/people'}>
              People
              <span
                className={` ${isActive('/people') ? s.active : ''}`}
              ></span>
            </TransitionLink>
            <TransitionLink className={`${s.link}`} href={'/approach'}>
              <p className={s.linkText}> Approach</p>
              <span
                className={` ${isActive('/approach') ? s.active : ''}`}
              ></span>
            </TransitionLink>
            <TransitionLink className={`${s.link}`} href={'/about'}>
              <p className={s.linkText}>About</p>
              <span className={` ${isActive('/about') ? s.active : ''}`}></span>
            </TransitionLink>
            {/* Hidden for now */}
            {/* <TransitionLink
              className={`${s.link} ${isActive('/rd') ? s.active : ''}`}
              href={'/rd'}
            >
              Playground
            </TransitionLink> */}
            <TransitionLink className={`${s.link}`} href={'/contact'}>
              <p className={s.linkText}>Contact</p>
              <span
                className={`${s.link} ${isActive('/contact') ? s.active : ''}`}
              ></span>
            </TransitionLink>
          </nav>
        </div>
        <div className={s.bottomSection}>
          {featuredProject && featuredProject.openGraphImage && (
            <a className={s.latest} href={`/work/${featuredProject.slug}`}>
              <div className={s.projectThumb}>
                <img
                  src={`${featuredProject.openGraphImage?.responsiveImage?.src}`}
                  alt={`${featuredProject.openGraphImage.responsiveImage?.alt}`}
                />
                <span>Featured Project</span>
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
