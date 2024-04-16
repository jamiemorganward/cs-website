import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import s from './ModalAnimation.module.scss'
import { transform } from 'lodash'

interface ModalAnimationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
}

export const ModalAnimation = React.forwardRef<
  HTMLDivElement,
  ModalAnimationProps
>((props, ref) => {
  const { in: open, children, onEnter, onExited, className, ...other } = props
  const innerRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  useImperativeHandle(ref, () => innerRef.current!, [])

  useEffect(() => {
    const vh = window.innerHeight
    if (!innerRef.current || !onEnter || !onExited) {
      return
    }

    gsap.to(innerRef.current, {
      duration: 0.8,
      ease: open ? 'elastic.out(0.5, 0.6)' : 'power4.out',
      y: open
        ? 0
        : innerRef.current.offsetHeight +
          (vh - innerRef.current.offsetHeight) / 2,
      onComplete: () => {
        setAnimationComplete(true)
        open ? onEnter(null as any, true) : onExited(null as any, true)
      }
    })
  }, [open])

  return (
    <div
      ref={innerRef}
      className={`${s.modal} ${animationComplete ? s.open : ''} ${
        !animationComplete ? s.closed : ''
      }`}
      {...other}
    >
      {children}
    </div>
  )
})

ModalAnimation.displayName = 'ModalAnimation'
