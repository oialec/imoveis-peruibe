export type TipoImovel = 'casa' | 'apartamento' | 'terreno' | 'comercial'
export type StatusImovel = 'ativo' | 'inativo'

export interface Imovel {
  id: string
  titulo: string
  slug: string
  tipo: TipoImovel
  cidade: string
  bairro: string | null
  preco: number
  entrada_sugerida: number | null
  parcelamento_direto: boolean
  quartos: number
  banheiros: number
  vagas: number
  area_m2: number | null
  descricao: string | null
  status: StatusImovel
  destaque: boolean
  fotos: string[]
  criado_em: string
}

export type ImovelInsert = Omit<Imovel, 'id' | 'criado_em'>

export interface FiltrosImoveis {
  tipo?: TipoImovel | ''
  cidade?: string
  precoMin?: number
  precoMax?: number
  quartos?: number
  page?: number
}

export const TIPOS_IMOVEL: { value: TipoImovel; label: string }[] = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
]
