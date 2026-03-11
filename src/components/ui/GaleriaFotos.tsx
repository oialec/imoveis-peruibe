'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { useCallback } from 'react'

const PLACEHOLDER = 'https://placehold.co/800x600/1a3c2e/c9a84c?text=Foto+em+breve'

interface Props {
  fotos: string[]
  titulo: string
}

export default function GaleriaFotos({ fotos, titulo }: Props) {
  const fotosExibir = fotos.length > 0 ? fotos : [PLACEHOLDER]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const anterior = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const proximo = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (fotosExibir.length === 1) {
    return (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
        <Image
          src={fotosExibir[0]}
          alt={titulo}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {fotosExibir.map((foto, i) => (
            <div
              key={i}
              className="flex-none w-full aspect-[16/10] relative bg-stone-100"
            >
              <Image
                src={foto}
                alt={`${titulo} — foto ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação — apenas desktop */}
      <button
        onClick={anterior}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all hover:scale-105"
        aria-label="Foto anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={proximo}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all hover:scale-105"
        aria-label="Próxima foto"
      >
        <ChevronRight size={20} />
      </button>

      {/* Contador */}
      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
        {fotosExibir.length} foto{fotosExibir.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
