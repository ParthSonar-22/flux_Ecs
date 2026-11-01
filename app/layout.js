/* eslint-disable @next/next/no-page-custom-font -- Shared App Router root layout, not a per-page font. */
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PitRadio from '@/components/ui/PitRadio'

const display = localFont({
  src: '../public/fonts/BarlowCondensed-Bold.ttf',
  variable: '--font-display',
  display: 'swap',
  weight: '700',
})
const body = localFont({
  src: '../public/fonts/Barlow-Regular.ttf',
  variable: '--font-body',
  display: 'swap',
  weight: '400',
})

const introFont = localFont({
  src: '../public/fonts/SairaExtraCondensed-Black.ttf',
  variable: '--font-intro',
  display: 'swap',
  weight: '900',
})

export const metadata = {
  metadataBase: new URL('https://flux-ecs.vercel.app'),
  title: {
    default: 'FluxECS | Electronics & Computer Science, VESIT',
    template: '%s | FluxECS',
  },
  description:
    'The Electronics and Computer Science council at VESIT. Student projects, hardware, software, events and a community built around making.',
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
  openGraph: {
    title: 'FluxECS | From circuits to code',
    description:
      'The Electronics and Computer Science council at VESIT, Mumbai.',
    images: ['/logo-flux.png'],
    type: 'website',
  },
}
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${introFont.variable} dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <PitRadio />
        <Footer />
      </body>
    </html>
  )
}
