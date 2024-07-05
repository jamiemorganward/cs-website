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
        {/* TODO: This transition element still needs some thought */}
        <div
          id="transition-element"
          style={{
            background: '#f2f2f2',
            width: '100vw',
            height: '100vh',
            zIndex: 10000000,
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          className="w-screen h-screen bg-black z-100 fixed top-0 left-0"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.48686 10H5.54347C6.11762 8.89455 7.07186 8.1186 8.20805 7.26207C9.82944 6.0395 11 4.78036 11 3.03073C11 1.1054 9.94165 0 8.30711 0C6.77771 0 5.9569 0.732052 5.5283 2.25474H5.4717C5.03097 0.732052 4.2233 0 2.70805 0C1.04622 0 0 1.1054 0 3.03073C0 4.78036 1.17258 6.04682 2.80711 7.26207C3.93724 8.12592 4.88339 8.89455 5.48686 10Z"
              fill="#FFC10C"
            />
          </svg>
        </div>
      </body>
    </html>
  )
}
