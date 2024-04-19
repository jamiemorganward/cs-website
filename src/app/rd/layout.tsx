import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'R&D | ClickSuite'
}

export default async function RDLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
