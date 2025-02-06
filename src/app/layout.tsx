import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { DropdownMenuNav } from '@/components/DropdownMenuNav'

const bg =
  process.env.PUBLIC_URL == 'production'
    ? 'bg-[url(https://leesf.xyz/img/background.jpeg)]'
    : 'bg-[url(/img/background.jpg)]'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bg} bg-fixed antialiased`}
      >
        <div className="flex w-full justify-center">
          <div className="flex max-w-5xl flex-col p-7">
            <div className="flex flex-row-reverse">
              <DropdownMenuNav
                pages={[
                  { name: 'Home', path: '' },
                  { name: 'Blogs', path: '' },
                ]}
              />
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
