'use client'

import { animatePageOut } from '@/lib/pageTransitions'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type TransitionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode
    href: string
  } & React.RefAttributes<HTMLAnchorElement>

export default function TransitionLink({
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (props.href !== pathname) {
      e.preventDefault()
      animatePageOut(props.href, router)
      if (typeof props.onClick !== 'undefined') {
        props.onClick(e)
      }
    }
  }

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}
