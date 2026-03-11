import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Imóveis em Peruíbe | Parcelamento Direto com o Proprietário',
    template: '%s | Imóveis Peruíbe',
  },
  description:
    'Encontre casas, apartamentos e terrenos em Peruíbe. Parcelamento direto com o proprietário, sem banco, sem burocracia. Atendimento pessoal e especializado.',
  keywords: ['imóveis Peruíbe', 'casa Peruíbe', 'parcelamento direto', 'terreno Peruíbe', 'apartamento litoral'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://imoveis-peruibe.vercel.app',
    siteName: 'Imóveis Peruíbe',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
