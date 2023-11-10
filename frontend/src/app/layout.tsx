import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'TP-API',
  description: 'Esta pagina fue creada para la materia aplicaciones interactivas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="h-screen w-screen">{children}</body>
    </html>
  )
}
