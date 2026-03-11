import Link from 'next/link'
import { MessageCircle, MapPin, Shield } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'

export default function Footer() {
  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'
  const creci = process.env.NEXT_PUBLIC_CRECI || 'CRECI 123456-F'
  const anoInicio = process.env.NEXT_PUBLIC_ANO_INICIO || '2010'
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5513999999999'
  const whatsappFormatado = whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')

  return (
    <footer className="bg-verde-escuro text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 — Identidade */}
          <div>
            <p className="font-playfair text-xl font-bold text-white mb-1">{nome}</p>
            <p className="text-green-300 text-sm font-semibold mb-3">{creci}</p>
            <p className="text-stone-300 text-sm leading-relaxed">
              Especialista em imóveis em Peruíbe e litoral sul de São Paulo.
              Parcelamento direto, sem banco, sem burocracia.
            </p>
            <div className="flex items-center gap-2 mt-4 text-stone-400 text-sm">
              <MapPin size={14} />
              <span>Peruíbe, SP — desde {anoInicio}</span>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navegação
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Início' },
                { href: '/imoveis', label: 'Ver Imóveis' },
                { href: '/como-funciona', label: 'Como Funciona' },
                { href: '/sobre', label: 'Quem Sou Eu' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-stone-300 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3 — Contato */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Fale Comigo
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-xl transition-colors font-medium mb-4"
            >
              <MessageCircle size={20} />
              <div>
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-xs text-green-100">{whatsappFormatado}</div>
              </div>
            </a>
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Shield size={12} />
              <span>{creci} — Corretora Autônoma</span>
            </div>
          </div>
        </div>

        <div className="border-t border-verde-medio/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-xs">
          <p>© {new Date().getFullYear()} {nome}. Todos os direitos reservados.</p>
          <p>Corretora autônoma em Peruíbe desde {anoInicio}</p>
        </div>
      </div>
    </footer>
  )
}
