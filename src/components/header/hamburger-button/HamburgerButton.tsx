import s from './HamburgerButton.module.scss'
export const HamburgerButton = ({
  open,
  onClick,
  dark
}: {
  open: boolean
  onClick: () => void
  dark: boolean
}) => {
  return (
    <button
      className={`${s.hamburgerMenu} ${open ? s.open : ''} ${
        dark ? s.dark : ''
      }`}
      onClick={onClick}
    >
      <span className={s.barTop}></span>
      <span className={s.barCenter}></span>
      <span className={s.barBottom}></span>
    </button>
  )
}
