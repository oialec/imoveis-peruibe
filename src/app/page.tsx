import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, BadgeCheck, Star, ArrowRight, Home, Handshake, KeyRound, Shield } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'
import { getImoveisDestaque } from '@/lib/imoveis'
import CardImovel from '@/components/ui/CardImovel'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BotaoWhatsApp from '@/components/layout/BotaoWhatsApp'

export default async function HomePage() {
  const imoveisDestaque = await getImoveisDestaque()
  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'
  const creci = process.env.NEXT_PUBLIC_CRECI || 'CRECI 123456-F'

  return (
    <>
      <Header />
      <main>
        {/* ──────────────────────────────────────
            HERO
        ────────────────────────────────────── */}
        <section className="relative bg-verde-escuro text-white overflow-hidden">
          {/* Textura de fundo */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-dourado/20 text-dourado-claro text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-dourado/30 animate-fade-in">
                <BadgeCheck size={16} />
                Parcelamento Direto com o Proprietário
              </div>
              
              <h1 className="font-playfair text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-up">
                Seu imóvel em Peruíbe{' '}
                <span className="text-dourado italic">sem banco</span>,{' '}
                sem burocracia
              </h1>
              
              <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-up delay-200">
                Você paga uma entrada e parcela diretamente com o dono do imóvel.
                Simples assim. Sem aprovação de crédito, sem taxas de financiamento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
                <Link
                  href="/imoveis"
                  className="btn-primary bg-dourado hover:bg-dourado-claro text-verde-escuro text-base flex items-center justify-center gap-2"
                >
                  Ver imóveis disponíveis
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base border-2 border-green-400 bg-transparent hover:bg-green-500"
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────
            BLOCO DE CONFIANÇA
        ────────────────────────────────────── */}
        <section className="bg-creme border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Foto + nome */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-verde-escuro flex items-center justify-center text-dourado font-playfair text-2xl font-bold shadow-lg overflow-hidden">
                  <span>{nome.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-playfair font-bold text-verde-escuro text-lg">{nome}</p>
                  <p className="text-dourado text-sm font-semibold">{creci}</p>
                </div>
              </div>

              {/* Divisor */}
              <div className="hidden md:block w-px h-12 bg-stone-300" />

              {/* Selos */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {[
                  { icon: BadgeCheck, label: 'CRECI Ativo', cor: 'text-verde-escuro' },
                  { icon: Handshake, label: 'Parcelamento Direto', cor: 'text-dourado-escuro' },
                  { icon: Shield, label: 'Atendimento Pessoal', cor: 'text-verde-medio' },
                ].map((selo) => (
                  <div
                    key={selo.label}
                    className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-stone-200"
                  >
                    <selo.icon size={16} className={selo.cor} />
                    <span className="text-sm font-semibold text-stone-700">{selo.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────
            COMO FUNCIONA
        ────────────────────────────────────── */}
        <section className="section bg-white">
          <div className="container-max">
            <div className="text-center mb-12">
              <p className="text-dourado font-semibold text-sm uppercase tracking-widest mb-2">
                Processo simples
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-verde-escuro">
                Como funciona o parcelamento direto?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  numero: '01',
                  icon: Home,
                  titulo: 'Escolha seu imóvel',
                  descricao:
                    'Veja nossos imóveis disponíveis e escolha o que combina com você. Casas, apartamentos, terrenos — com parcelamento direto.',
                },
                {
                  numero: '02',
                  icon: Handshake,
                  titulo: 'Combine entrada e parcelas',
                  descricao:
                    'Você e o proprietário definem juntos o valor de entrada e o valor das parcelas. Sem banco, sem aprovação de crédito.',
                },
                {
                  numero: '03',
                  icon: KeyRound,
                  titulo: 'Assine e mude-se',
                  descricao:
                    'Com o contrato assinado, o imóvel é seu. Basta começar a pagar as parcelas diretamente para o dono.',
                },
              ].map((passo, i) => (
                <div
                  key={passo.numero}
                  className={`relative bg-creme rounded-2xl p-7 border border-stone-100 animate-fade-up`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <span className="font-playfair text-6xl font-bold text-dourado/20 absolute top-4 right-5 select-none">
                    {passo.numero}
                  </span>
                  <div className="w-12 h-12 bg-verde-escuro rounded-xl flex items-center justify-center mb-4">
                    <passo.icon size={22} className="text-dourado" />
                  </div>
                  <h3 className="font-playfair font-bold text-verde-escuro text-xl mb-2">
                    {passo.titulo}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{passo.descricao}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/como-funciona" className="btn-outline inline-flex items-center gap-2">
                Saber mais sobre o parcelamento
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────
            IMÓVEIS EM DESTAQUE
        ────────────────────────────────────── */}
        <section className="section bg-creme">
          <div className="container-max">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-dourado font-semibold text-sm uppercase tracking-widest mb-2">
                  Seleção especial
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-verde-escuro">
                  Imóveis em destaque
                </h2>
              </div>
              <Link
                href="/imoveis"
                className="text-verde-medio font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ver todos <ArrowRight size={16} />
              </Link>
            </div>

            {imoveisDestaque.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {imoveisDestaque.map((imovel) => (
                  <CardImovel key={imovel.id} imovel={imovel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-stone-400">
                <Home size={40} className="mx-auto mb-3 opacity-30" />
                <p>Novos imóveis em breve</p>
              </div>
            )}

            <div className="text-center mt-10">
              <Link href="/imoveis" className="btn-primary inline-flex items-center gap-2">
                Ver todos os imóveis
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────
            SEÇÃO DE CONTATO
        ────────────────────────────────────── */}
        <section className="section bg-verde-escuro text-white">
          <div className="container-max text-center max-w-2xl mx-auto">
            <Star className="mx-auto mb-4 text-dourado" size={32} />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Pronto para encontrar seu imóvel?
            </h2>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Fale diretamente comigo. Sem call center, sem secretária — você fala com
              a corretora que vai cuidar de tudo.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4 inline-flex"
            >
              <MessageCircle size={22} />
              Falar no WhatsApp agora
            </a>
            <p className="text-stone-500 text-sm mt-4">Respondo rápido. Promessa.</p>
          </div>
        </section>
      </main>
      <Footer />
      <BotaoWhatsApp />
    </>
  )
}
