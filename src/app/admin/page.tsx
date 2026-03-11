import { getImoveisAdmin } from '@/lib/imoveis'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Edit, Archive, TrendingUp, Home, Eye, EyeOff } from 'lucide-react'
import { formatarPreco } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const PLACEHOLDER = 'https://placehold.co/80x60/1a3c2e/c9a84c?text=Foto'

export default async function AdminDashboard() {
  const imoveis = await getImoveisAdmin()
  const ativos = imoveis.filter((i) => i.status === 'ativo').length
  const inativos = imoveis.filter((i) => i.status === 'inativo').length
  const destaques = imoveis.filter((i) => i.destaque).length

  const labelTipo: Record<string, string> = {
    casa: 'Casa', apartamento: 'Apt.', terreno: 'Terreno', comercial: 'Comercial',
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-verde-escuro">Dashboard</h1>
          <p className="text-stone-400 text-sm mt-0.5">Gerencie seus imóveis</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle size={16} />
          Novo imóvel
        </Link>
      </div>

      {/* Cards de stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Home, valor: imoveis.length, label: 'Total de imóveis', cor: 'text-verde-escuro' },
          { icon: Eye, valor: ativos, label: 'Ativos (visíveis)', cor: 'text-green-600' },
          { icon: EyeOff, valor: inativos, label: 'Inativos', cor: 'text-stone-400' },
          { icon: TrendingUp, valor: destaques, label: 'Em destaque', cor: 'text-dourado-escuro' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <stat.icon size={20} className={`${stat.cor} mb-2`} />
            <p className={`font-playfair text-3xl font-bold ${stat.cor}`}>{stat.valor}</p>
            <p className="text-stone-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabela de imóveis */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-semibold text-verde-escuro">Todos os imóveis</h2>
          <Link href="/admin/imoveis" className="text-sm text-verde-medio hover:text-verde-escuro transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-5 py-3">Imóvel</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Tipo</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-4 py-3">Preço</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {imoveis.slice(0, 10).map((imovel) => (
                <tr key={imovel.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={imovel.fotos?.[0] || PLACEHOLDER}
                          alt={imovel.titulo}
                          width={48}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-verde-escuro truncate max-w-[180px]">
                          {imovel.titulo}
                        </p>
                        <p className="text-xs text-stone-400">{imovel.cidade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-lg">
                      {labelTipo[imovel.tipo]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-verde-escuro">
                      {formatarPreco(imovel.preco)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                      imovel.status === 'ativo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-stone-100 text-stone-500'
                    }`}>
                      {imovel.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/imoveis/${imovel.id}/editar`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-verde-medio hover:text-verde-escuro transition-colors"
                    >
                      <Edit size={13} />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {imoveis.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              <Home size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum imóvel cadastrado ainda</p>
              <Link href="/admin/imoveis/novo" className="text-verde-medio text-sm hover:underline mt-1 inline-block">
                Adicionar o primeiro imóvel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
