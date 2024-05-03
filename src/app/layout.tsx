import { Metadata, ResolvingMetadata } from 'next'
import '@/styles/main.scss'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { PageInfoContextProvider } from '@/lib/contexts/PageInfoContext'
import { getClient } from '@/lib/serverClient'
import { SeoDocument, SeoQuery } from '@/graphql/generated/graphql'

export const generateMetadata = async () => {
  const client = getClient()
  const seoData = await client.query<SeoQuery>({
    query: SeoDocument,
    context: {
      fetchOptions: {
        next: { tags: ['seo'] }
      }
    }
  })
  // construct output object
  const metadata = {
    title: seoData.data._site.globalSeo?.siteName,
    description: seoData.data._site.globalSeo?.fallbackSeo?.description
  }
  return metadata
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
        <PageInfoContextProvider>
          <Header />
          {children}
          <Footer />
        </PageInfoContextProvider>
        <div
          id="transition-element"
          style={{
            background: 'white',
            width: '100vw',
            height: '100vh',
            zIndex: 10000000,
            position: 'fixed',
            top: 0,
            left: 0
          }}
          className="w-screen h-screen bg-black z-100 fixed top-0 left-0"
        ></div>
      </body>
    </html>
  )
}
