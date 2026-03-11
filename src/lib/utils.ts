import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor)
}

export function gerarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function whatsappLink(mensagem?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5513999999999'
  const texto = mensagem || 'Olá! Vim pelo site e gostaria de saber mais sobre os imóveis.'
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}

export function whatsappImovel(tituloImovel: string): string {
  const mensagem = `Olá! Tenho interesse no imóvel: *${tituloImovel}*. Poderia me dar mais informações?`
  return whatsappLink(mensagem)
}
