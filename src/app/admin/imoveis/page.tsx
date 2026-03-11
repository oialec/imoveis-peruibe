import { getImoveisAdmin } from '@/lib/imoveis'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Edit } from 'lucide-react'
import { formatarPreco } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gerenciar Imóveis' }

const PLACEHOLDER = 'https://placehold.co/80x60/1a3c2e/c9a84c?text=Foto'

export default async function AdminImoveisPage() {
  const imoveis = await getImoveisAdmin()

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-verde-escuro">Imóveis</h1>
          <p className="text-stone-400 text-sm mt-0.5">{imoveis.length} imóveis cadastrados</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle size={16} />
          Novo imóvel
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                {['Imóvel', 'Tipo', 'Cidade', 'Preço', 'Parcelamento', 'Status', 'Destaque', ''].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-4 py-3 first:px-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {imoveis.map((imovel) => (
                <tr key={imovel.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-3">
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
                      <p className="text-sm font-medium text-verde-escuro max-w-[160px] truncate">
                        {imovel.titulo}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-sm text-stone-600">{imovel.tipo}</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{imovel.cidade}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-verde-escuro">
                    {formatarPreco(imovel.preco)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      imovel.parcelamento_direto
                        ? 'bg-dourado/10 text-dourado-escuro'
                        : 'bg-stone-100 text-stone-400'
                    }`}>
                      {imovel.parcelamento_direto ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      imovel.status === 'ativo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-stone-100 text-stone-500'
                    }`}>
                      {imovel.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {imovel.destaque ? '⭐' : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/imoveis/${imovel.id}/editar`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-verde-medio hover:text-verde-escuro transition-colors bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg"
                    >
                      <Edit size={12} />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {imoveis.length === 0 && (
            <div className="text-center py-16 text-stone-400">
              <p>Nenhum imóvel cadastrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
