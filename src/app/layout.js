'use client';
import { RecoilRoot } from 'recoil'
import Providers from './components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Instagram 2.0 Build</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <RecoilRoot>
          {children}
          </RecoilRoot>
        </Providers> 
      </body>
    </html>
  )
}
