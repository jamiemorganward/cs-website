import { Metadata } from 'next'
import '@/styles/main.scss'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js'
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/blj5pkg.css" />
      </head>
      <body style={{ overscrollBehavior: 'none' }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
