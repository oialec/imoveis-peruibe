'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (error) {
      setErro('Email ou senha incorretos. Tente novamente.')
      setCarregando(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  const nome = process.env.NEXT_PUBLIC_NOME_CORRETORA || 'Ana Paula Souza'

  return (
    <div className="min-h-screen bg-verde-escuro flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-dourado/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-playfair text-3xl font-bold text-dourado">
              {nome.charAt(0)}
            </span>
          </div>
          <h1 className="font-playfair text-2xl font-bold text-white">{nome}</h1>
          <p className="text-stone-400 text-sm mt-1">Área da corretora</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-6 shadow-2xl"
        >
          <h2 className="font-semibold text-verde-escuro text-lg mb-5">Entrar no painel</h2>

          {erro && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100">
              {erro}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-9 pr-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-verde-escuro"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-stone-400" />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full pl-9 pr-10 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-verde-escuro"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? (
                <span className="animate-spin">↻</span>
              ) : (
                <LogIn size={16} />
              )}
              {carregando ? 'Entrando...' : 'Entrar no painel'}
            </button>
          </div>
        </form>

        <p className="text-center text-stone-500 text-xs mt-6">
          Acesso restrito à corretora
        </p>
      </div>
    </div>
  )
}
