import { useState } from 'react'
import s from './HamburgerButton.module.scss'
export const HamburgerButton = ({
  open,
  onClick
}: {
  open: boolean
  onClick: () => void
}) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <button
      className={`${s.hamburgerMenu} ${open ? s.open : ''}`}
      onClick={onClick}
    >
      <span className={s.barTop}></span>
      <span className={s.barCenter}></span>
      <span className={s.barBottom}></span>
    </button>
  )
}
