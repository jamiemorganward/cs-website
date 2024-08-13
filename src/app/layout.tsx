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
            width="115.5"
            height="55.25"
            viewBox="0 0 462 221"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M152.232 178.72L153.065 178.285C153.655 158.867 162.158 141.019 172.762 120.682C187.88 91.6645 196.134 65.5925 183.735 41.8097C170.09 15.6386 146.723 8.71066 122.747 21.2112C100.302 32.914 93.4437 49.1455 97.9604 73.1151L97.1277 73.5493C79.8677 56.2237 62.8269 52.4525 40.594 64.0443C16.2113 76.7568 8.70725 99.7799 22.3523 125.951C34.7522 149.734 60.9256 157.983 93.5139 162.001C116.214 165.099 135.547 168.308 152.232 178.72Z"
              fill="#FFC10C"
            />
            <path
              d="M323.635 182.618L324.518 182.938C339.229 170.251 358.132 164.456 380.288 158.531C411.893 150.064 436.689 138.529 445.839 113.317C455.909 85.5737 445.225 63.6688 419.808 54.4439C396.013 45.8076 379.415 51.7217 364.799 71.2493L363.916 70.9289C365.023 46.4983 356.287 31.389 332.718 22.8347C306.87 13.4533 284.829 23.4807 274.759 51.2244C265.608 76.4363 277.216 101.303 296.277 128.039C309.333 146.866 320.033 163.284 323.635 182.618Z"
              fill="#FF6600"
            />
            <path
              d="M237.771 188.297H238.71C248.211 171.352 264.002 159.455 282.807 146.325C309.627 127.583 329 108.282 329 81.4602C329 51.9456 311.484 35 284.445 35C259.131 35 245.546 46.2222 238.47 69.5646H237.531C230.236 46.2222 216.869 35 191.796 35C164.298 35 147 51.9456 147 81.4602C147 108.282 166.395 127.697 193.434 146.325C212.13 159.567 227.79 171.352 237.771 188.297Z"
              fill="#9190FF"
            />
          </svg>
        </div>
      </body>
    </html>
  )
}
