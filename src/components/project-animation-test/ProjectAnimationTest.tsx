'use client'
import s from './ProjectAnimationTest.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export const ProjectAnimationTest = () => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(useGSAP)

  const boxRef = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(() => {
    // let tops = boxRef.current.map((box) =>
    //   ScrollTrigger.create({
    //     trigger: box,
    //     start: 'top top',
    //     pin: true,
    //     pinSpacing: false
    //   })
    // )
    boxRef.current.map((box, i) => {
      ScrollTrigger.create({
        scrub: true,
        pin: true,
        trigger: box,
        start: 'top 20%',
        end: '+=50000vh',
        markers: true,
        pinSpacing: false
      })
    })
  }, [boxRef])

  const boxArr = [1, 2, 3, 4, 5]

  if (!boxArr) return <></>

  return (
    <div>
      {boxArr.map((box, i) => {
        return (
          <div key={i} ref={(el) => (boxRef.current[i] = el)} className={s.box}>
            Box {box}
          </div>
        )
      })}
    </div>
  )
}
