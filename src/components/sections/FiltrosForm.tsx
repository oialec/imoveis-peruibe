'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { TIPOS_IMOVEL, type FiltrosImoveis } from '@/types'

interface Props {
  filtrosAtuais: FiltrosImoveis
}

export default function FiltrosForm({ filtrosAtuais }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [aberto, setAberto] = useState(false)

  const [form, setForm] = useState({
    tipo: filtrosAtuais.tipo || '',
    cidade: filtrosAtuais.cidade || '',
    precoMin: filtrosAtuais.precoMin?.toString() || '',
    precoMax: filtrosAtuais.precoMax?.toString() || '',
    quartos: filtrosAtuais.quartos?.toString() || '',
  })

  function aplicar() {
    const params = new URLSearchParams()
    if (form.tipo) params.set('tipo', form.tipo)
    if (form.cidade) params.set('cidade', form.cidade)
    if (form.precoMin) params.set('precoMin', form.precoMin)
    if (form.precoMax) params.set('precoMax', form.precoMax)
    if (form.quartos) params.set('quartos', form.quartos)
    router.push(`${pathname}?${params.toString()}`)
    setAberto(false)
  }

  function limpar() {
    setForm({ tipo: '', cidade: '', precoMin: '', precoMax: '', quartos: '' })
    router.push(pathname)
    setAberto(false)
  }

  const temFiltro = Object.values(form).some(Boolean)

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      {/* Linha superior */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setAberto(!aberto)}
          className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-sm font-medium text-stone-600 hover:border-verde-escuro hover:text-verde-escuro transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filtros
          {temFiltro && (
            <span className="w-5 h-5 bg-verde-escuro text-white text-xs rounded-full flex items-center justify-center">
              {Object.values(form).filter(Boolean).length}
            </span>
          )}
        </button>

        {/* Tipo rápido */}
        <div className="flex gap-2 flex-wrap">
          {['', ...TIPOS_IMOVEL.map((t) => t.value)].map((tipo) => (
            <button
              key={tipo}
              onClick={() => {
                const p = new URLSearchParams()
                if (tipo) p.set('tipo', tipo)
                router.push(`${pathname}?${p.toString()}`)
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                (filtrosAtuais.tipo || '') === tipo
                  ? 'bg-verde-escuro text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tipo === '' ? 'Todos' : TIPOS_IMOVEL.find((t) => t.value === tipo)?.label}
            </button>
          ))}
        </div>

        {temFiltro && (
          <button
            onClick={limpar}
            className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            <X size={14} /> Limpar
          </button>
        )}
      </div>

      {/* Filtros expandidos */}
      {aberto && (
        <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Cidade</label>
            <input
              type="text"
              placeholder="Ex: Peruíbe"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde-escuro"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Preço mínimo (R$)</label>
            <input
              type="number"
              placeholder="0"
              value={form.precoMin}
              onChange={(e) => setForm({ ...form, precoMin: e.target.value })}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde-escuro"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Preço máximo (R$)</label>
            <input
              type="number"
              placeholder="Qualquer"
              value={form.precoMax}
              onChange={(e) => setForm({ ...form, precoMax: e.target.value })}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde-escuro"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Quartos (mínimo)</label>
            <select
              value={form.quartos}
              onChange={(e) => setForm({ ...form, quartos: e.target.value })}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde-escuro bg-white"
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-4 flex gap-3 justify-end">
            <button
              onClick={limpar}
              className="px-4 py-2.5 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors"
            >
              Limpar filtros
            </button>
            <button
              onClick={aplicar}
              className="btn-primary flex items-center gap-2 text-sm px-6 py-2.5"
            >
              <Search size={15} />
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
