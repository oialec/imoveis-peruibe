import { MessageCircle, BadgeCheck, MapPin, Users, Calendar, Star } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BotaoWhatsApp from '@/components/layout/BotaoWhatsApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quem Sou Eu',
  description: 'Conheça a corretora de imóveis especialista em Peruíbe com parcelamento direto.',
}

const depoimentos = [
  {
    nome: 'Marcos e Juliana S.',
    texto:
      'A Ana Paula nos ajudou a encontrar nossa casa de praia em Peruíbe em menos de duas semanas. O parcelamento direto foi um alívio — sem banco, sem estresse.',
    estrelas: 5,
  },
  {
    nome: 'Roberto F.',
    texto:
      'Comprei meu terreno com parcelamento direto. Tudo muito claro, sem letras miúdas. Ela cuidou de toda a documentação.',
    estrelas: 5,
  },
  {
    nome: 'Família Takahashi',
    texto:
      'Moramos longe mas a corretora nos deu todo suporte por WhatsApp. Compra 100% segura e tranquila. Recomendo sem hesitar.',
    estrelas: 5,
  },
]

export default function SobrePage() {
  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'
  const creci = process.env.NEXT_PUBLIC_CRECI || 'CRECI 123456-F'
  const anoInicio = parseInt(process.env.NEXT_PUBLIC_ANO_INICIO || '2010')
  const anosExperiencia = new Date().getFullYear() - anoInicio

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-creme pt-16 pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="py-8 md:py-16">
                <p className="text-dourado font-semibold text-sm uppercase tracking-widest mb-3">
                  Conheça sua corretora
                </p>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-verde-escuro mb-4">
                  {nome}
                </h1>
                <div className="flex items-center gap-2 mb-6">
                  <BadgeCheck size={18} className="text-verde-medio" />
                  <span className="text-verde-medio font-semibold text-sm">{creci} — Ativo</span>
                </div>
                <p className="text-stone-600 text-lg leading-relaxed mb-6">
                  Sou moradora de Peruíbe há mais de {anosExperiencia} anos. Conheço cada bairro,
                  cada rua, cada esquina. Meu trabalho é encontrar o imóvel certo para a
                  sua vida — não só para a sua carteira.
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex"
                >
                  <MessageCircle size={18} />
                  Fale diretamente comigo
                </a>
              </div>

              {/* Foto placeholder */}
              <div className="relative flex justify-center md:justify-end">
                <div className="w-72 h-80 md:w-80 md:h-96 rounded-3xl bg-verde-escuro flex items-center justify-center shadow-2xl overflow-hidden">
                  <span className="font-playfair text-8xl font-bold text-dourado/30">
                    {nome.charAt(0)}
                  </span>
                </div>
                {/* Badge flutuante */}
                <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                  <BadgeCheck size={20} className="text-verde-medio" />
                  <div>
                    <p className="text-xs font-bold text-verde-escuro">{creci}</p>
                    <p className="text-xs text-stone-400">Corretora Autônoma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Linha do tempo / números */}
        <section className="bg-verde-escuro text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Calendar, numero: `+${anosExperiencia}`, label: 'Anos de experiência' },
                { icon: Users, numero: '+200', label: 'Famílias atendidas' },
                { icon: MapPin, numero: '3', label: 'Cidades no litoral' },
              ].map((item) => (
                <div key={item.label} className="py-4">
                  <item.icon className="mx-auto mb-2 text-dourado" size={28} />
                  <p className="font-playfair text-4xl font-bold text-dourado mb-1">
                    {item.numero}
                  </p>
                  <p className="text-stone-300 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que trabalhar comigo */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-verde-escuro">
                Por que trabalhar comigo?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  titulo: 'Parcelamento direto',
                  descricao:
                    'Sem banco, sem financiamento, sem aprovação de crédito. Você e o proprietário combinam tudo diretamente. Simples e transparente.',
                },
                {
                  titulo: 'Atendimento pessoal',
                  descricao:
                    'Não é escritório, não é central de atendimento. Sou eu que atendo, eu que negocio, eu que resolvo. Do começo ao fim.',
                },
                {
                  titulo: 'Conhecimento local',
                  descricao:
                    'Peruíbe e região não têm segredo pra mim. Sei qual bairro valoriza, qual rua inunda, onde tem melhor infraestrutura.',
                },
              ].map((item, i) => (
                <div
                  key={item.titulo}
                  className="bg-creme rounded-2xl p-7 border border-stone-100"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-dourado/20 flex items-center justify-center mb-4">
                    <span className="font-playfair font-bold text-dourado text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-verde-escuro text-xl mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="section bg-creme">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-playfair text-3xl font-bold text-verde-escuro">
                O que dizem os clientes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {depoimentos.map((dep) => (
                <div
                  key={dep.nome}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: dep.estrelas }).map((_, i) => (
                      <Star key={i} size={14} className="text-dourado fill-dourado" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{dep.texto}&rdquo;
                  </p>
                  <p className="font-semibold text-verde-escuro text-sm">{dep.nome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-verde-escuro text-white text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold mb-4">
              Vamos conversar?
            </h2>
            <p className="text-stone-300 mb-8">
              Me manda uma mensagem. Sem compromisso, sem pressão.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4 inline-flex"
            >
              <MessageCircle size={22} />
              Falar com {nome.split(' ')[0]}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <BotaoWhatsApp />
    </>
  )
}
