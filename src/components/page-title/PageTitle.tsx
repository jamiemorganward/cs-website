import s from './PageTitle.module.scss'

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
