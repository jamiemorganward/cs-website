import React from 'react'
import s from './IntroSection.module.scss'

interface IntroSectionProps {
  headline?: string | null
}

export const IntroSection = ({ headline }: IntroSectionProps) => {
  return (
    <div className={s.introSectionWrapper}>
      <h1 className={s.introSectionTitle}>
        {headline || `Next.js Starter Kit`}
      </h1>
      <div className={s.introductionWrapper}>
        <p className={s.introduction}>
          Welcome to the starter kit. TypeScript, SASS, SCSS modules, and SVGR
          are preinstalled and ready to go. In the /src directory you will find
          an app, components, styles, and assets folder. Have a look around and
          start building!
        </p>
      </div>
    </div>
  )
}
