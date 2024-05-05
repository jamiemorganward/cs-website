'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './HomePage.module.scss'
import { LampShade } from '../lamp-shade/LampShade'
import { HomeLoading } from '../home-loading/HomeLoading'

export const HomePage = () => {
  // TODO: all the work for loading page is here but half of it is probably unnecessary
  // const currentTimer = useRef<ReturnType<typeof setInterval>>()
  // const [loading, setLoading] = useState(true)
  // const [percentage, setPercentage] = useState(0)

  // useEffect(() => {
  //   // create a interval and get the id
  //   currentTimer.current = setInterval(() => {
  //     setPercentage((percentage) => percentage + 20)
  //   }, 1000)
  //   // clear out the interval using the id when unmounting the component
  //   return () => clearInterval(currentTimer.current)
  // }, [])

  // useEffect(() => {
  //   if (percentage === 100) {
  //     clearInterval(currentTimer.current)
  //   }
  // }, [percentage])
  return <LampShade />
  // else return <HomeLoading percentage={percentage} />
}
