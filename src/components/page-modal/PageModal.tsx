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
  const [initialPadding, setInitialPadding] = useState(216)
  const [padding, setPadding] = useState(initialPadding)
  const pathname = usePathname()
  const [routeChange, setRouteChange] = useState(0)

  useLayoutEffect(() => {
    console.log(`Route changed to ${pathname}`)
    setRouteChange((prev) => prev + 1)
    console.log(routeChange)
    console.log(scrollRef.current)
  }, [pathname])

  // let distTop = scrollRef.current?.style.padding

  const handleGrow = () => {
    console.log('test')
    let scrollAmount = scrollRef.current?.scrollTop || 0
    let distTop = initialPadding - scrollAmount
    setPadding(distTop)
    console.log(scrollRef.current?.scrollTop)
    console.log(distTop)
    // return distTop
  }

  useEffect(() => {
    setModalOpen(true)
    setModalMounted(true)
  }, [])

  useLayoutEffect(() => {
    console.log(scrollRef.current)
    scrollRef.current?.addEventListener('scroll', handleGrow)

    return () => scrollRef.current?.removeEventListener('scroll', handleGrow)
  }, [])

  const handleClose = () => {
    setModalMounted(false)
    router.back()
  }

  if (!modalMounted) return <></>

  return (
    <Modal
      ref={scrollRef}
      style={{ paddingTop: `${padding}`, paddingBottom: '10px' }}
      open={modalOpen}
      closeAfterTransition
      onClose={() => {
        setModalOpen(false)
      }}
      slots={{
        backdrop: ModalBackdrop
      }}
      className={`${s.modalWrapper} ${modalOpen ? s.open : ''}`}
    >
      <ModalAnimation className={s.modal} in={modalOpen} onExited={handleClose}>
        <div className={s.modalInnerWrapper}>
          <RDProjectPage data={data} />
        </div>
      </ModalAnimation>
    </Modal>
  )
}
