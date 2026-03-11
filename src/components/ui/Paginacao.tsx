import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  paginaAtual: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

export default function Paginacao({ paginaAtual, totalPages, searchParams }: Props) {
  function buildUrl(page: number) {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'page') params.set(k, v)
    })
    params.set('page', page.toString())
    return `/imoveis?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {paginaAtual > 1 && (
        <Link
          href={buildUrl(paginaAtual - 1)}
          className="flex items-center gap-1 px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-600 hover:border-verde-escuro hover:text-verde-escuro transition-colors"
        >
          <ChevronLeft size={16} /> Anterior
        </Link>
      )}

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={buildUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
              page === paginaAtual
                ? 'bg-verde-escuro text-white'
                : 'border border-stone-200 text-stone-600 hover:border-verde-escuro'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {paginaAtual < totalPages && (
        <Link
          href={buildUrl(paginaAtual + 1)}
          className="flex items-center gap-1 px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-600 hover:border-verde-escuro hover:text-verde-escuro transition-colors"
        >
          Próxima <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}
