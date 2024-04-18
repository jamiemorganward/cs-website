import { HomePage } from '@/components/home-page/HomePage'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Home | ClickSuite'
}

export default async function Page() {
  return <HomePage />
}
