import FormularioImovel from '@/components/admin/FormularioImovel'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Novo Imóvel' }

export default function NovoImovelPage() {
  return <FormularioImovel />
}
