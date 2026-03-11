'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'
  const creci = process.env.NEXT_PUBLIC_CRECI || 'CRECI 123456-F'

  const nav = [
    { href: '/', label: 'Início' },
    { href: '/imoveis', label: 'Imóveis' },
    { href: '/como-funciona', label: 'Como Funciona' },
    { href: '/sobre', label: 'Quem Sou' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Nome */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-playfair text-lg md:text-xl font-bold text-verde-escuro">
              {nome}
            </span>
            <span className="text-xs text-dourado font-semibold tracking-wider uppercase hidden md:block">
              {creci} · Corretora de Imóveis
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-verde-escuro transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp + Hambúrguer */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              className="md:hidden p-2 text-stone-600"
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label="Menu"
            >
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="py-3 px-4 text-stone-700 font-medium rounded-lg hover:bg-stone-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-stone-100">
            <p className="text-xs text-stone-400 px-4">{creci}</p>
          </div>
        </div>
      )}
    </header>
  )
}
