'use client'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import s from './PageModal.module.scss'
import { Modal } from '@mui/base'
import { RDProjectPage } from '../rd-project-page/RDProjectPage'
import { GetRdProjectQuery } from '@/graphql/generated/graphql'
import { useRouter } from 'next/navigation'
import { ModalBackdrop } from './modal-backdrop/ModalBackdrop'
import { ModalAnimation } from './modal-animation/ModalAnimation'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export const PageModal = ({
  data,
  children
}: {
  data: GetRdProjectQuery
  children?: ReactNode
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMounted, setModalMounted] = useState(false)
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [initialPadding, setInitialPadding] = useState(216)
  const [padding, setPadding] = useState(initialPadding)
  const pathname = usePathname()
  const [routeChange, setRouteChange] = useState(0)

  useLayoutEffect(() => {
    setRouteChange((prev) => prev + 1)
  }, [pathname])

  // let distTop = scrollRef.current?.style.padding

  const handleGrow = () => {
    let scrollAmount = scrollRef.current?.scrollTop || 0
    let distTop = initialPadding - scrollAmount
    // if (distTop >= 216) {
    //   console.log('Reach')
    //   gsap.to(wrapperRef.current, { padding: 0, duration: 1 })
    // }
    setPadding(distTop)
  }

  useEffect(() => {
    setModalOpen(true)
    setModalMounted(true)
  }, [])

  const handleClose = () => {
    setModalMounted(false)
    router.back()
  }

  if (!modalMounted) return <></>

  return (
    <Modal
      style={{ paddingTop: `${padding}`, paddingBottom: '10px' }}
      open={modalOpen}
      closeAfterTransition
      onClose={() => {
        setModalOpen(false)
      }}
      onScroll={handleGrow}
      slots={{
        backdrop: ModalBackdrop
      }}
      className={`${s.modalWrapper} ${modalOpen ? s.open : ''}`}
      ref={wrapperRef}
    >
      <ModalAnimation className={s.modal} in={modalOpen} onExited={handleClose}>
        <div className={s.modalInnerWrapper}>
          <RDProjectPage data={data} />
        </div>
      </ModalAnimation>
    </Modal>
  )
}
