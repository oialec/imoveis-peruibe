import { Suspense } from 'react'
import { getImoveis } from '@/lib/imoveis'
import CardImovel from '@/components/ui/CardImovel'
import FiltrosForm from '@/components/sections/FiltrosForm'
import Paginacao from '@/components/ui/Paginacao'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BotaoWhatsApp from '@/components/layout/BotaoWhatsApp'
import { Home } from 'lucide-react'
import type { Metadata } from 'next'
import type { FiltrosImoveis, TipoImovel } from '@/types'

export const metadata: Metadata = {
  title: 'Imóveis à Venda em Peruíbe',
  description: 'Casas, apartamentos e terrenos em Peruíbe com parcelamento direto com o proprietário.',
}

interface PageProps {
  searchParams: {
    tipo?: string
    cidade?: string
    precoMin?: string
    precoMax?: string
    quartos?: string
    page?: string
  }
}

export default async function ImoveisPage({ searchParams }: PageProps) {
  const filtros: FiltrosImoveis = {
    tipo: (searchParams.tipo as TipoImovel) || undefined,
    cidade: searchParams.cidade || undefined,
    precoMin: searchParams.precoMin ? Number(searchParams.precoMin) : undefined,
    precoMax: searchParams.precoMax ? Number(searchParams.precoMax) : undefined,
    quartos: searchParams.quartos ? Number(searchParams.quartos) : undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
  }

  const { imoveis, total, totalPages } = await getImoveis(filtros)
  const paginaAtual = filtros.page || 1

  return (
    <>
      <Header />
      <main className="bg-creme min-h-screen">
        {/* Topo */}
        <section className="bg-verde-escuro text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-dourado text-sm font-semibold uppercase tracking-widest mb-2">
              Todos os imóveis
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold">
              Imóveis em Peruíbe e região
            </h1>
            <p className="text-stone-300 mt-2">
              {total} imóvel{total !== 1 ? 'is' : ''} disponível{total !== 1 ? 'is' : ''}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filtros */}
          <Suspense>
            <FiltrosForm filtrosAtuais={filtros} />
          </Suspense>

          {/* Grid */}
          {imoveis.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {imoveis.map((imovel) => (
                  <CardImovel key={imovel.id} imovel={imovel} />
                ))}
              </div>
              {totalPages > 1 && (
                <Paginacao
                  paginaAtual={paginaAtual}
                  totalPages={totalPages}
                  searchParams={searchParams}
                />
              )}
            </>
          ) : (
            <div className="text-center py-20 text-stone-400">
              <Home size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Nenhum imóvel encontrado</p>
              <p className="text-sm mt-1">Tente ajustar os filtros ou entre em contato</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BotaoWhatsApp />
    </>
  )
}
