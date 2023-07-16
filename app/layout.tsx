'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from "./providers/NextAuth"
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Serch Github repositories',
  description: 'Serch Github repositories by keyword quickly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
        <NextAuthProvider>
          <div>
            {children}
          </div>
        </NextAuthProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}
