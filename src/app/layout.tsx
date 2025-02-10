import type { Metadata } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { DropdownMenuNav } from '@/components/DropdownMenuNav'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LeeSF - Programmer',
  description: 'LeeSF Software Engineering Experiences and Projects',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[url(/img/background.jpg)] bg-fixed antialiased`}
      >
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-5xl flex-col p-7">
            <div className="flex flex-row-reverse">
              <DropdownMenuNav />
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
