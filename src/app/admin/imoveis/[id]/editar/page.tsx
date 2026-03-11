import { notFound } from 'next/navigation'
import { getImovelById } from '@/lib/imoveis'
import FormularioImovel from '@/components/admin/FormularioImovel'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovelById(params.id)
  return { title: imovel ? `Editar: ${imovel.titulo}` : 'Editar Imóvel' }
}

export default async function EditarImovelPage({ params }: Props) {
  const imovel = await getImovelById(params.id)
  if (!imovel) notFound()
  return <FormularioImovel imovelInicial={imovel} />
}
