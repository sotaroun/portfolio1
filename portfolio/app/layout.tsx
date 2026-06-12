import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '安部 壮一 | Frontend Engineer',
  description: 'Web App Engineer Portfolio — Frontend (Next.js / TypeScript / React)',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}