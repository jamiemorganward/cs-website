import { ContactPage } from '@/components/contact-page/ContactPage'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact | ClickSuite'
}

export default async function Page() {
  return <ContactPage />
}
