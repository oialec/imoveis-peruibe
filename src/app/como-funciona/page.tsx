'use client'

import { useState } from 'react'
import { MessageCircle, ChevronDown, Check, Handshake, Shield, FileText, Banknote } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BotaoWhatsApp from '@/components/layout/BotaoWhatsApp'

const faqs = [
  {
    pergunta: 'O parcelamento direto é seguro?',
    resposta:
      'Sim! Todo o processo é formalizado em contrato registrado em cartório. Você tem garantias jurídicas tanto quanto em um financiamento bancário — mas sem as burocracias e taxas de juros dos bancos.',
  },
  {
    pergunta: 'Qual é o valor mínimo de entrada?',
    resposta:
      'O valor de entrada é combinado diretamente entre o comprador e o proprietário do imóvel. Não há um valor fixo — tudo é negociável conforme a situação de cada um. Cada imóvel tem um valor de entrada sugerido que serve como ponto de partida.',
  },
  {
    pergunta: 'Preciso de análise de crédito?',
    resposta:
      'Não! Esse é justamente o diferencial do parcelamento direto. Como você negocia diretamente com o proprietário, não há necessidade de aprovação bancária, análise de crédito ou score no serasa.',
  },
  {
    pergunta: 'Qual é o prazo máximo de parcelamento?',
    resposta:
      'O prazo é definido entre comprador e proprietário. Normalmente varia de 12 a 60 meses, dependendo do valor do imóvel e da entrada paga. Quanto maior a entrada, mais flexibilidade no prazo.',
  },
  {
    pergunta: 'O imóvel fica no meu nome?',
    resposta:
      'A transferência completa de escritura geralmente ocorre após a quitação total do valor, mas isso é definido em contrato. Em muitos casos, o comprador já pode morar no imóvel desde o início do pagamento.',
  },
  {
    pergunta: 'E se eu não conseguir pagar alguma parcela?',
    resposta:
      'Tudo depende do que está previsto no contrato. Por isso é fundamental ter um contrato bem redigido. Eu indico advogados especializados para que tudo fique muito claro e proteja ambas as partes.',
  },
  {
    pergunta: 'Posso parcelar qualquer imóvel?',
    resposta:
      'Não todos — o parcelamento direto depende da aceitação do proprietário. Os imóveis com essa opção estão claramente sinalizados no site com o badge "Parcela Direto".',
  },
]

function FaqItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
        onClick={() => setAberto(!aberto)}
      >
        <span className="font-semibold text-verde-escuro text-sm md:text-base pr-4">
          {pergunta}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-stone-400 transition-transform ${aberto ? 'rotate-180' : ''}`}
        />
      </button>
      {aberto && (
        <div className="px-5 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
          <p className="pt-3">{resposta}</p>
        </div>
      )}
    </div>
  )
}

export default function ComoFuncionaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-verde-escuro text-white py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Handshake className="mx-auto mb-4 text-dourado" size={40} />
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Como funciona o parcelamento direto?
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed">
              Uma forma simples, transparente e sem burocracia de comprar seu imóvel
              em Peruíbe.
            </p>
          </div>
        </section>

        {/* O que é */}
        <section className="section bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose-custom">
              <h2 className="font-playfair text-3xl font-bold text-verde-escuro mb-6 text-center">
                O que é o parcelamento direto?
              </h2>
              <p className="text-stone-600 text-center text-lg mb-10 leading-relaxed">
                É quando você compra um imóvel pagando uma entrada e parcelando o restante
                diretamente com o proprietário — sem envolver banco, financeira ou qualquer
                instituição financeira.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  icon: Banknote,
                  titulo: 'Sem banco',
                  desc: 'Você não precisa de aprovação de crédito. Negocia diretamente com o proprietário.',
                },
                {
                  icon: FileText,
                  titulo: 'Com contrato',
                  desc: 'Tudo formalizado em contrato registrado em cartório. Seguro para ambas as partes.',
                },
                {
                  icon: Shield,
                  titulo: 'Sem juros absurdos',
                  desc: 'Sem taxas bancárias. Os valores são combinados diretamente entre comprador e vendedor.',
                },
                {
                  icon: Check,
                  titulo: 'Para quem tem nome sujo',
                  desc: 'Como não há análise de crédito bancária, pessoas com restrições também podem comprar.',
                },
              ].map((item) => (
                <div key={item.titulo} className="flex gap-4 bg-creme rounded-2xl p-5 border border-stone-100">
                  <div className="w-10 h-10 bg-verde-escuro rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={18} className="text-dourado" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-verde-escuro mb-1">{item.titulo}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Passo a passo */}
        <section className="section bg-creme">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold text-verde-escuro mb-10 text-center">
              Passo a passo
            </h2>
            <div className="space-y-4">
              {[
                { passo: '1', titulo: 'Escolha o imóvel', desc: 'Navegue pelo site e encontre o imóvel que tem o badge "Parcela Direto".' },
                { passo: '2', titulo: 'Entre em contato', desc: 'Me envie uma mensagem pelo WhatsApp. Eu conheço cada imóvel e vou te explicar tudo.' },
                { passo: '3', titulo: 'Visitamos juntos', desc: 'Organizamos uma visita presencial para você conhecer o imóvel.' },
                { passo: '4', titulo: 'Negociamos', desc: 'Apresento você ao proprietário e mediamos a negociação de entrada e parcelas.' },
                { passo: '5', titulo: 'Assinamos o contrato', desc: 'Com os termos definidos, elaboramos o contrato e registramos em cartório.' },
                { passo: '6', titulo: 'Você se muda!', desc: 'Após a assinatura, o imóvel é seu. Comece a pagar as parcelas e aproveite.' },
              ].map((item, i) => (
                <div key={item.passo} className="flex gap-4 bg-white rounded-2xl p-5 border border-stone-100">
                  <div className="w-8 h-8 bg-dourado/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair font-bold text-dourado-escuro text-sm">{item.passo}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-verde-escuro">{item.titulo}</h3>
                    <p className="text-stone-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold text-verde-escuro mb-8 text-center">
              Perguntas frequentes
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.pergunta} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-verde-escuro text-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-stone-300 mb-8">
              Me manda uma mensagem. Explico tudo com calma e sem compromisso.
            </p>
            <a
              href={whatsappLink('Olá! Tenho dúvidas sobre o parcelamento direto. Pode me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4 inline-flex"
            >
              <MessageCircle size={22} />
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <BotaoWhatsApp />
    </>
  )
}
