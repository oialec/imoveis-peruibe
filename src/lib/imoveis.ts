import { createClient } from '@/lib/supabase/server'
import type { FiltrosImoveis, Imovel } from '@/types'

const PER_PAGE = 9

export async function getImoveisDestaque(): Promise<Imovel[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('status', 'ativo')
    .eq('destaque', true)
    .order('criado_em', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Erro ao buscar imóveis em destaque:', error)
    return []
  }
  return data || []
}

export async function getImoveis(filtros: FiltrosImoveis = {}): Promise<{
  imoveis: Imovel[]
  total: number
  totalPages: number
}> {
  const supabase = await createClient()
  const page = filtros.page || 1
  const from = (page - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  let query = supabase
    .from('imoveis')
    .select('*', { count: 'exact' })
    .eq('status', 'ativo')

  if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
  if (filtros.cidade) query = query.ilike('cidade', `%${filtros.cidade}%`)
  if (filtros.precoMin) query = query.gte('preco', filtros.precoMin)
  if (filtros.precoMax) query = query.lte('preco', filtros.precoMax)
  if (filtros.quartos) query = query.gte('quartos', filtros.quartos)

  const { data, error, count } = await query
    .order('criado_em', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Erro ao buscar imóveis:', error)
    return { imoveis: [], total: 0, totalPages: 0 }
  }

  const total = count || 0
  return {
    imoveis: data || [],
    total,
    totalPages: Math.ceil(total / PER_PAGE),
  }
}

export async function getImovelBySlug(slug: string): Promise<Imovel | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'ativo')
    .single()

  if (error) return null
  return data
}

// Admin — busca todos (incluindo inativos)
export async function getImoveisAdmin(): Promise<Imovel[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .order('criado_em', { ascending: false })

  if (error) {
    console.error('Erro ao buscar imóveis admin:', error)
    return []
  }
  return data || []
}

export async function getImovelById(id: string): Promise<Imovel | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}
