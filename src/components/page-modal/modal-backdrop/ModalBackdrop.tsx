import React, { useEffect, useState } from 'react'
import s from './ModalBackdrop.module.scss'

interface ModalBackdropProps {
  open?: boolean
  className: string
  ownerState: any
}

export const ModalBackdrop = React.forwardRef<
  HTMLDivElement,
  ModalBackdropProps
>((props, ref) => {
  const { open, className, ownerState: _ownerState, ...other } = props
  const [innerOpen, setInnerOpen] = useState<boolean | undefined>(false)
  useEffect(() => {
    setInnerOpen(open)
  }, [open])
  return (
    <div
      className={`${s.modalBackdrop} ${innerOpen ? s.open : ''}`}
      ref={ref}
      {...other}
    />
  )
})

ModalBackdrop.displayName = 'ModalBackdrop'
