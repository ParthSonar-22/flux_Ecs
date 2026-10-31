import { EB_Garamond, Newsreader, Space_Mono, Caveat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-caveat',
})

export const metadata = {
  metadataBase: new URL('https://flux-ecs.ves.ac.in'),
  title: {
    default: 'FLUX-ECS | Dept. of Electronics & Computer Science, VESIT',
    template: '%s | FLUX-ECS',
  },
  description:
    'FLUX-ECS is the technical club of the Department of Electronics and Computer Science at VESIT, Mumbai. Where Ideas Flow into Innovation.',
  icons: {
    icon: '/logo-flux.png',
    apple: '/logo-flux.png',
  },
  openGraph: {
    title: 'FLUX-ECS | Dept. of Electronics & Computer Science, VESIT',
    description:
      'The technical club of the Department of Electronics and Computer Science at VESIT, Mumbai.',
    images: ['/logo-flux.png'],
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ebGaramond.variable} ${newsreader.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink font-body-md antialiased selection:bg-brick selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="w-full pt-20 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
