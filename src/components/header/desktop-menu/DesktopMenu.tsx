import s from './DesktopMenu.module.scss'
import { MenuItem } from './menu-item/MenuItem'

export const DesktopMenu = ({ sticky }: { sticky: boolean | undefined }) => {
  return (
    <div className={s.menuWrapper}>
      <nav className={`${s.menu} ${sticky ? s.sticky : ''}`}>
        <MenuItem text="Work" link={'/work'} hasSubMenuPill sticky={sticky} />
        <MenuItem text="People" link={'/people'} sticky={sticky} />
        <MenuItem text="About" link={'/about'} sticky={sticky} />
        <MenuItem text="Playground" link={'/rd'} sticky={sticky} />
        <MenuItem text="Contact" link={'/contact'} sticky={sticky} />
      </nav>
    </div>
  )
}
