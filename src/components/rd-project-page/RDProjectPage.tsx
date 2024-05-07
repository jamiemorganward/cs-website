'use client'
import { GetRdProjectQuery } from '@/graphql/generated/graphql'
import s from './RDProjectPage.module.scss'
import { FlexibleContent } from '../flexible-content/FlexibleContent'
import { ReactLenis } from '@studio-freight/react-lenis'
import { RDFlexibleContent } from './rd-flexible-content/RDFlexibleContent'

export const RDProjectPage = ({ data }: { data: GetRdProjectQuery }) => {
  return (
    <main className={s.gridWrapper}>
      <div className={s.projectHeaderWrapper}>
        <div className={s.projectHeader}>
          <div className={s.name}>{data.rdProject?.projectName}</div>
          <div className={s.year}>{data.rdProject?.year}</div>
        </div>
        <div className={s.featuredMedia}>
          <img
            src={data.rdProject?.featuredMedia?.responsiveImage?.src}
            // alt={`${data.rdProject?.featuredMedia?.responsiveImage?.alt}`}
          />
        </div>
      </div>
      <div className={s.flexContentWrapper}>
        {data.rdProject?.flexibleContent.map((slice, i) => {
          return <RDFlexibleContent key={i} data={slice} />
        })}
      </div>
    </main>
  )
}
