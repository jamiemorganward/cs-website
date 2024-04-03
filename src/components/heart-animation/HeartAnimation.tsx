import { ReactNode, useEffect, useRef, useState } from 'react'
import Heart from '../../assets/svgs/heart.svg'
import s from './HeartAnimation.module.scss'
import { useWindowSize } from '@/utils/useWindowSize'
import gsap from 'gsap'

export const HeartAnimation = () => {
  const windowSize = useWindowSize()
  const [columns, setColumns] = useState<number>(88)
  const [noOfHearts, setNoOfHearts] = useState<number>(1848)

  const [heartGrid, setHeartGrid] = useState<number[]>([])

  // grid setup

  const renderHeartGrid = () => {
    if (windowSize.width && typeof windowSize.width !== 'undefined') {
      setColumns(Math.floor((windowSize.width ? windowSize.width : 0) / 17))
    }

    // if (windowSize.width && windowSize.width > 991) {
    //   // setNoOfHearts(1848)
    //   setNoOfHearts(10)
    // } else if (
    //   windowSize.width &&
    //   windowSize.width < 991 &&
    //   windowSize.width > 767
    // ) {
    //   setNoOfHearts(900)
    // } else {
    //   setNoOfHearts(500)
    // }

    let hearts: number[] = []

    if (windowSize.width) {
      for (let i = 0; i < noOfHearts; i++) {
        hearts.push(i)
      }
    }
    setHeartGrid(hearts)
  }

  useEffect(() => {
    renderHeartGrid()
  }, [windowSize.width])

  // animation

  const triggerRef = useRef<HTMLDivElement | null>(null)
  const heartsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    let rectMaxDistance = 0

    // heartsRef.current.map((heart, i) => {
    //   const growTween = gsap.to(heart, {
    //     scale: 2,
    //     transformOrigin: '50% 50%',
    //     ease: 'none',
    //     paused: true
    //   })

    //   let rect = heart?.getBoundingClientRect()
    //   const triggerRect = triggerRef.current?.getBoundingClientRect()
    //   if (rect && triggerRect) {
    //     let rectRight = rect.left + rect.width
    //     let rectBottom = rect.top + rect.height
    //     let rectCenterX = rect.left + rect.width / 2
    //     let rectCenterY = rect.top + rect.height / 2
    //     let rectMaxX = rect.right - rectCenterX
    //     let rectMaxY = rectCenterY - triggerRect.top
    //     rectMaxDistance = Math.sqrt(
    //       Math.pow(rectMaxX, 2) + Math.pow(rectMaxY, 2)
    //     )
    //   }

    //   // Change progress back to 0 on leave
    //   let out = (e: MouseEvent) => {
    //     // console.log('out')
    //     gsap.from(growTween, {
    //       progress: 0,
    //       duration: 0.2,
    //       overwrite: 'auto'
    //     })
    //   }
    // })

    let needForRAF = true

    const moveEvent = (e: MouseEvent) => {
      const calculateFrame = () => {
        heartsRef.current.map((heart, i) => {
          let rect = heart?.getBoundingClientRect()
          const triggerRect = triggerRef.current?.getBoundingClientRect()
          if (rect && triggerRect) {
            Math.floor(
              Math.sqrt(
                Math.pow(e.pageX - (rect.left + rect.width / 2), 2) +
                  Math.pow(e.pageY - (rect.top + rect.height / 2), 2)
              )
            )

            // let rectRight = rect.left + rect.width
            // let rectBottom = rect.top + rect.height
            // let rectCenterX = rect.left + rect.width / 2
            // let rectCenterY = rect.top + rect.height / 2
            // let rectMaxX = rect.right - rectCenterX
            // let rectMaxY = rectCenterY - triggerRect.top
            rectMaxDistance = 100

            // // If hovering the element, set progress to 1
            if (rect) {
              //   const inRect =
              //     e.pageX > rect.left &&
              //     e.pageX < rect.right &&
              //     e.pageY > rect.top &&
              //     e.pageY < rect.bottom
              let progress = 1

              //   if (!inRect) {
              //     // Circular distance from center of heart
              const dist = Math.floor(
                Math.sqrt(
                  Math.pow(e.pageX - (rect.left + rect.width / 2), 2) +
                    Math.pow(e.pageY - (rect.top + rect.height / 2), 2)
                )
              )

              progress = 1 - dist / rectMaxDistance
              //   }

              // Update tween's progress
              // tl.progress(0.5)
              // tl.pause()
              gsap.set(heart, {
                scale: 1 + Math.max(0, progress),
                transformOrigin: '50% 50%',
                ease: 'none'
              })
            }
          }
        })
        needForRAF = true
      }

      if (needForRAF) {
        needForRAF = false // no need to call rAF up until next frame
        requestAnimationFrame(calculateFrame) // request 60fps animation
      }
    }

    triggerRef.current?.addEventListener('mousemove', moveEvent)
    // triggerRef.current?.addEventListener('mouseleave', out)
  }, [triggerRef.current])

  if (!windowSize.width || typeof windowSize.width === 'undefined') return <></>

  return (
    <div
      className={`${s.animationWrapper} trigger`}
      ref={triggerRef}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {heartGrid.map((heart, i) => {
        return (
          <div
            ref={(el) => (heartsRef.current[i] = el)}
            className={s.heart}
            key={i}
          >
            {<Heart />}
          </div>
        )
      })}
    </div>
  )
}
