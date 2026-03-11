import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Car, Maximize, MapPin, BadgeCheck } from 'lucide-react'
import { formatarPreco } from '@/lib/utils'
import type { Imovel } from '@/types'

interface Props {
  imovel: Imovel
}

const PLACEHOLDER = 'https://placehold.co/600x400/1a3c2e/c9a84c?text=Foto+em+breve'

export default function CardImovel({ imovel }: Props) {
  const foto = imovel.fotos?.[0] || PLACEHOLDER
  const labelTipo: Record<string, string> = {
    casa: 'Casa',
    apartamento: 'Apartamento',
    terreno: 'Terreno',
    comercial: 'Comercial',
  }

  return (
    <Link
      href={`/imoveis/${imovel.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100"
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={foto}
          alt={imovel.titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Tipo badge */}
        <span className="absolute top-3 left-3 bg-verde-escuro text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {labelTipo[imovel.tipo]}
        </span>
        {/* Parcelamento badge */}
        {imovel.parcelamento_direto && (
          <span className="absolute top-3 right-3 bg-dourado text-verde-escuro text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <BadgeCheck size={12} />
            Parcela Direto
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Localização */}
        <div className="flex items-center gap-1 text-stone-400 text-xs mb-2">
          <MapPin size={12} />
          <span>{imovel.bairro ? `${imovel.bairro}, ` : ''}{imovel.cidade}</span>
        </div>

        {/* Título */}
        <h3 className="font-playfair font-semibold text-verde-escuro text-base leading-snug mb-3 line-clamp-2 group-hover:text-verde-medio transition-colors">
          {imovel.titulo}
        </h3>

        {/* Preço */}
        <p className="text-xl font-bold text-verde-escuro mb-1">
          {formatarPreco(imovel.preco)}
        </p>
        {imovel.entrada_sugerida && imovel.parcelamento_direto && (
          <p className="text-xs text-dourado-escuro font-medium mb-3">
            Entrada a partir de {formatarPreco(imovel.entrada_sugerida)}
          </p>
        )}

        {/* Características */}
        {imovel.tipo !== 'terreno' && (
          <div className="flex items-center gap-3 text-stone-500 text-xs border-t border-stone-100 pt-3">
            {imovel.quartos > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={13} />
                {imovel.quartos} qto{imovel.quartos > 1 ? 's' : ''}
              </span>
            )}
            {imovel.banheiros > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={13} />
                {imovel.banheiros} bnh
              </span>
            )}
            {imovel.vagas > 0 && (
              <span className="flex items-center gap-1">
                <Car size={13} />
                {imovel.vagas} vaga{imovel.vagas > 1 ? 's' : ''}
              </span>
            )}
            {imovel.area_m2 && (
              <span className="flex items-center gap-1 ml-auto">
                <Maximize size={13} />
                {imovel.area_m2}m²
              </span>
            )}
          </div>
        )}
        {imovel.tipo === 'terreno' && imovel.area_m2 && (
          <div className="flex items-center gap-1 text-stone-500 text-xs border-t border-stone-100 pt-3">
            <Maximize size={13} />
            <span>{imovel.area_m2}m²</span>
          </div>
        )}
      </div>
    </Link>
  )
}
