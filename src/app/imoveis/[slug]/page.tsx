import { notFound } from 'next/navigation'
import { getImovelBySlug } from '@/lib/imoveis'
import { formatarPreco, whatsappImovel } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BotaoWhatsApp from '@/components/layout/BotaoWhatsApp'
import GaleriaFotos from '@/components/ui/GaleriaFotos'
import { Bed, Bath, Car, Maximize, MapPin, BadgeCheck, MessageCircle, Handshake, Check } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovelBySlug(params.slug)
  if (!imovel) return { title: 'Imóvel não encontrado' }
  return {
    title: imovel.titulo,
    description: imovel.descricao?.substring(0, 160) || `${imovel.titulo} em ${imovel.cidade}`,
  }
}

export default async function ImovelPage({ params }: Props) {
  const imovel = await getImovelBySlug(params.slug)
  if (!imovel) notFound()

  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'
  const wpLink = whatsappImovel(imovel.titulo)

  const labelTipo: Record<string, string> = {
    casa: 'Casa', apartamento: 'Apartamento', terreno: 'Terreno', comercial: 'Comercial',
  }

  return (
    <>
      <Header />
      <main className="bg-creme pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-400 mb-6">
            <a href="/" className="hover:text-verde-escuro">Início</a>
            <span className="mx-2">/</span>
            <a href="/imoveis" className="hover:text-verde-escuro">Imóveis</a>
            <span className="mx-2">/</span>
            <span className="text-stone-600">{imovel.titulo}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2">
              {/* Galeria */}
              <GaleriaFotos fotos={imovel.fotos} titulo={imovel.titulo} />

              {/* Cabeçalho do imóvel */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-verde-escuro text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {labelTipo[imovel.tipo]}
                  </span>
                  {imovel.parcelamento_direto && (
                    <span className="badge-parcelamento">
                      <BadgeCheck size={12} />
                      Parcelamento Direto
                    </span>
                  )}
                </div>
                <h1 className="font-playfair text-2xl md:text-3xl font-bold text-verde-escuro mb-2">
                  {imovel.titulo}
                </h1>
                <div className="flex items-center gap-1.5 text-stone-400 text-sm">
                  <MapPin size={14} />
                  <span>{imovel.bairro ? `${imovel.bairro}, ` : ''}{imovel.cidade}</span>
                </div>
              </div>

              {/* Características */}
              {imovel.tipo !== 'terreno' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {[
                    { icon: Bed, valor: imovel.quartos, label: 'Quartos' },
                    { icon: Bath, valor: imovel.banheiros, label: 'Banheiros' },
                    { icon: Car, valor: imovel.vagas, label: 'Vagas' },
                    { icon: Maximize, valor: imovel.area_m2 ? `${imovel.area_m2}m²` : '-', label: 'Área' },
                  ].filter((c) => c.valor && c.valor !== 0).map((car) => (
                    <div key={car.label} className="bg-white rounded-xl p-4 text-center border border-stone-100">
                      <car.icon size={20} className="mx-auto mb-1 text-verde-medio" />
                      <p className="font-bold text-verde-escuro text-lg">{car.valor}</p>
                      <p className="text-xs text-stone-400">{car.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {imovel.tipo === 'terreno' && imovel.area_m2 && (
                <div className="flex items-center gap-2 mt-4 bg-white rounded-xl p-4 inline-flex border border-stone-100">
                  <Maximize size={18} className="text-verde-medio" />
                  <span className="font-bold text-verde-escuro">{imovel.area_m2}m²</span>
                  <span className="text-stone-400 text-sm">de área</span>
                </div>
              )}

              {/* Descrição */}
              {imovel.descricao && (
                <div className="mt-8">
                  <h2 className="font-playfair text-xl font-bold text-verde-escuro mb-3">
                    Sobre o imóvel
                  </h2>
                  <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                    {imovel.descricao}
                  </p>
                </div>
              )}

              {/* Bloco parcelamento direto */}
              {imovel.parcelamento_direto && (
                <div className="mt-8 bg-verde-escuro text-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake size={24} className="text-dourado" />
                    <h2 className="font-playfair text-xl font-bold">
                      Como funciona o parcelamento direto?
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Você paga uma entrada combinada com o proprietário',
                      'O restante é parcelado diretamente entre você e o dono — sem banco',
                      'Sem análise de crédito, sem taxa de financiamento',
                      'Tudo formalizado em contrato com segurança jurídica',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={16} className="text-dourado mt-0.5 flex-shrink-0" />
                        <span className="text-stone-200 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  {imovel.entrada_sugerida && (
                    <div className="mt-4 pt-4 border-t border-verde-medio/30">
                      <p className="text-stone-300 text-sm">
                        Entrada sugerida:{' '}
                        <strong className="text-dourado text-base">
                          {formatarPreco(imovel.entrada_sugerida)}
                        </strong>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar — desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Preço */}
                <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <p className="text-stone-400 text-sm mb-1">Preço total</p>
                  <p className="font-playfair text-3xl font-bold text-verde-escuro">
                    {formatarPreco(imovel.preco)}
                  </p>
                  {imovel.entrada_sugerida && imovel.parcelamento_direto && (
                    <p className="text-dourado-escuro text-sm font-medium mt-1">
                      + parcelas direto com o proprietário
                    </p>
                  )}
                </div>

                {/* Mini card da corretora */}
                <div className="bg-creme rounded-2xl border border-stone-100 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-verde-escuro flex items-center justify-center text-dourado font-playfair font-bold text-lg">
                      {nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-verde-escuro text-sm">{nome}</p>
                      <p className="text-xs text-stone-400">Sua corretora em Peruíbe</p>
                    </div>
                  </div>
                  <a
                    href={wpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full text-sm"
                  >
                    <MessageCircle size={16} />
                    Falar sobre este imóvel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bar mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3 lg:hidden shadow-2xl">
        <div>
          <p className="text-xs text-stone-400">Preço total</p>
          <p className="font-playfair font-bold text-verde-escuro text-xl">
            {formatarPreco(imovel.preco)}
          </p>
        </div>
        <a
          href={wpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 max-w-[200px] text-sm"
        >
          <MessageCircle size={16} />
          Tenho interesse
        </a>
      </div>

      <Footer />
      {/* WhatsApp flutuante acima do sticky bar no mobile */}
      <BotaoWhatsApp />
    </>
  )
}
