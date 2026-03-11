'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Home, PlusCircle, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'

  async function sair() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const nav = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/imoveis', icon: Home, label: 'Todos os imóveis' },
    { href: '/admin/imoveis/novo', icon: PlusCircle, label: 'Novo imóvel' },
  ]

  return (
    <aside className="w-60 bg-verde-escuro text-white flex flex-col min-h-screen sticky top-0 hidden md:flex">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-verde-medio/30">
        <p className="font-playfair font-bold text-white text-base">{nome.split(' ')[0]}</p>
        <p className="text-stone-400 text-xs mt-0.5">Painel da Corretora</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const ativo = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                ativo
                  ? 'bg-dourado/20 text-dourado'
                  : 'text-stone-300 hover:bg-verde-medio/20 hover:text-white'
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sair */}
      <div className="px-3 py-4 border-t border-verde-medio/30">
        <button
          onClick={sair}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut size={17} />
          Sair
        </button>
      </div>
    </aside>
  )
}
