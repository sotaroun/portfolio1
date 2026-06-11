import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '安部 壮一 | Frontend Engineer',
  description: 'Web App Engineer Portfolio — Frontend (Next.js / TypeScript / React)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}