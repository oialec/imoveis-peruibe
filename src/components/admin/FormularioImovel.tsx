'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { gerarSlug, formatarPreco } from '@/lib/utils'
import { TIPOS_IMOVEL, type Imovel, type TipoImovel } from '@/types'
import {
  Upload, X, GripVertical, Check, AlertCircle, Eye,
  ArrowLeft, Save, Loader2, ImagePlus,
} from 'lucide-react'
import Link from 'next/link'

interface Props {
  imovelInicial?: Imovel
}

type FormData = {
  titulo: string
  tipo: TipoImovel
  cidade: string
  bairro: string
  preco: string
  entrada_sugerida: string
  parcelamento_direto: boolean
  quartos: string
  banheiros: string
  vagas: string
  area_m2: string
  descricao: string
  status: 'ativo' | 'inativo'
  destaque: boolean
}

const inicial: FormData = {
  titulo: '',
  tipo: 'casa',
  cidade: 'Peruíbe',
  bairro: '',
  preco: '',
  entrada_sugerida: '',
  parcelamento_direto: true,
  quartos: '',
  banheiros: '',
  vagas: '',
  area_m2: '',
  descricao: '',
  status: 'ativo',
  destaque: false,
}

export default function FormularioImovel({ imovelInicial }: Props) {
  const router = useRouter()
  const isEdicao = !!imovelInicial

  const [form, setForm] = useState<FormData>(
    imovelInicial
      ? {
          titulo: imovelInicial.titulo,
          tipo: imovelInicial.tipo,
          cidade: imovelInicial.cidade,
          bairro: imovelInicial.bairro || '',
          preco: imovelInicial.preco.toString(),
          entrada_sugerida: imovelInicial.entrada_sugerida?.toString() || '',
          parcelamento_direto: imovelInicial.parcelamento_direto,
          quartos: imovelInicial.quartos.toString(),
          banheiros: imovelInicial.banheiros.toString(),
          vagas: imovelInicial.vagas.toString(),
          area_m2: imovelInicial.area_m2?.toString() || '',
          descricao: imovelInicial.descricao || '',
          status: imovelInicial.status,
          destaque: imovelInicial.destaque,
        }
      : inicial
  )

  const [fotosExistentes, setFotosExistentes] = useState<string[]>(imovelInicial?.fotos || [])
  const [novasFotos, setNovasFotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [erros, setErros] = useState<Partial<Record<keyof FormData, string>>>({})
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [msgErro, setMsgErro] = useState('')
  const [previewCard, setPreviewCard] = useState(false)

  function set(campo: keyof FormData, valor: string | boolean) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    if (erros[campo]) setErros((prev) => ({ ...prev, [campo]: '' }))
  }

  function onDropFotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const total = fotosExistentes.length + novasFotos.length + files.length
    if (total > 20) {
      alert('Máximo de 20 fotos por imóvel')
      return
    }
    setNovasFotos((prev) => [...prev, ...files])
    const novosPreview = files.map((f) => URL.createObjectURL(f))
    setPreviews((prev) => [...prev, ...novosPreview])
  }

  function removerFotoExistente(url: string) {
    setFotosExistentes((prev) => prev.filter((f) => f !== url))
  }

  function removerNovaFoto(index: number) {
    setNovasFotos((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function validar(): boolean {
    const e: typeof erros = {}
    if (!form.titulo.trim()) e.titulo = 'Obrigatório preencher o título'
    if (!form.preco || isNaN(Number(form.preco))) e.preco = 'Informe um preço válido'
    if (fotosExistentes.length + novasFotos.length === 0 && !isEdicao) {
      setMsgErro('Adicione pelo menos 1 foto')
      return false
    }
    setErros(e)
    return Object.keys(e).length === 0
  }

  async function salvar() {
    if (!validar()) return
    setSalvando(true)
    setSucesso(false)
    setMsgErro('')

    const supabase = createClient()

    try {
      // Upload das novas fotos
      const urlsNovas: string[] = []
      for (const foto of novasFotos) {
        const ext = foto.name.split('.').pop()
        const path = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('imoveis-fotos')
          .upload(path, foto)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('imoveis-fotos').getPublicUrl(path)
        urlsNovas.push(data.publicUrl)
      }

      const todasFotos = [...fotosExistentes, ...urlsNovas]
      const slug = gerarSlug(form.titulo)

      const payload = {
        titulo: form.titulo.trim(),
        slug: isEdicao ? imovelInicial!.slug : slug,
        tipo: form.tipo,
        cidade: form.cidade.trim() || 'Peruíbe',
        bairro: form.bairro.trim() || null,
        preco: Number(form.preco),
        entrada_sugerida: form.entrada_sugerida ? Number(form.entrada_sugerida) : null,
        parcelamento_direto: form.parcelamento_direto,
        quartos: Number(form.quartos) || 0,
        banheiros: Number(form.banheiros) || 0,
        vagas: Number(form.vagas) || 0,
        area_m2: form.area_m2 ? Number(form.area_m2) : null,
        descricao: form.descricao.trim() || null,
        status: form.status,
        destaque: form.destaque,
        fotos: todasFotos,
      }

      if (isEdicao) {
        const { error } = await supabase
          .from('imoveis')
          .update(payload)
          .eq('id', imovelInicial!.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('imoveis').insert(payload)
        if (error) throw error
      }

      setSucesso(true)
      setNovasFotos([])
      setPreviews([])
      setTimeout(() => {
        router.push('/admin/imoveis')
        router.refresh()
      }, 1500)
    } catch (err: unknown) {
      console.error(err)
      setMsgErro('Erro ao salvar. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  const todasFotosExibir = [...fotosExistentes, ...previews]
  const precoFormatado = form.preco && !isNaN(Number(form.preco))
    ? formatarPreco(Number(form.preco))
    : 'R$ 0'

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/imoveis"
          className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-stone-500" />
        </Link>
        <div>
          <h1 className="font-playfair text-2xl font-bold text-verde-escuro">
            {isEdicao ? 'Editar imóvel' : 'Novo imóvel'}
          </h1>
          <p className="text-stone-400 text-sm mt-0.5">
            {isEdicao ? imovelInicial?.titulo : 'Preencha os dados do imóvel'}
          </p>
        </div>
      </div>

      {/* Feedbacks */}
      {sucesso && (
        <div className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 mb-6">
          <Check size={18} />
          <span className="font-medium">Imóvel salvo com sucesso! ✓</span>
        </div>
      )}
      {msgErro && (
        <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-6">
          <AlertCircle size={18} />
          <span>{msgErro}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Informações básicas */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-5">Informações básicas</h2>

          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                Título do imóvel <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => set('titulo', e.target.value)}
                placeholder="Ex: Casa de praia com 3 quartos e piscina"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-verde-escuro/20 focus:border-verde-escuro transition-colors ${
                  erros.titulo ? 'border-red-300' : 'border-stone-200'
                }`}
              />
              {erros.titulo && <p className="text-red-400 text-xs mt-1">{erros.titulo}</p>}
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Tipo de imóvel</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIPOS_IMOVEL.map((tipo) => (
                  <button
                    key={tipo.value}
                    type="button"
                    onClick={() => set('tipo', tipo.value)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                      form.tipo === tipo.value
                        ? 'bg-verde-escuro text-white border-verde-escuro'
                        : 'border-stone-200 text-stone-600 hover:border-verde-escuro'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cidade e Bairro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Cidade</label>
                <input
                  type="text"
                  value={form.cidade}
                  onChange={(e) => set('cidade', e.target.value)}
                  placeholder="Peruíbe"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-verde-escuro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Bairro</label>
                <input
                  type="text"
                  value={form.bairro}
                  onChange={(e) => set('bairro', e.target.value)}
                  placeholder="Ex: Centro"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-verde-escuro"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-5">Valores</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                Preço do imóvel (R$) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={form.preco}
                onChange={(e) => set('preco', e.target.value)}
                placeholder="Ex: 250000"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-verde-escuro ${
                  erros.preco ? 'border-red-300' : 'border-stone-200'
                }`}
              />
              {form.preco && !isNaN(Number(form.preco)) && (
                <p className="text-verde-medio text-xs mt-1 font-medium">{precoFormatado}</p>
              )}
              {erros.preco && <p className="text-red-400 text-xs mt-1">{erros.preco}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                Entrada sugerida (R$)
              </label>
              <input
                type="number"
                value={form.entrada_sugerida}
                onChange={(e) => set('entrada_sugerida', e.target.value)}
                placeholder="Ex: 40000"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-verde-escuro"
              />
              {form.entrada_sugerida && !isNaN(Number(form.entrada_sugerida)) && (
                <p className="text-verde-medio text-xs mt-1 font-medium">
                  {formatarPreco(Number(form.entrada_sugerida))}
                </p>
              )}
            </div>
          </div>

          {/* Parcelamento direto toggle */}
          <div className="flex items-center gap-3 p-4 bg-creme rounded-xl border border-stone-100">
            <button
              type="button"
              onClick={() => set('parcelamento_direto', !form.parcelamento_direto)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                form.parcelamento_direto ? 'bg-verde-escuro' : 'bg-stone-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.parcelamento_direto ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-verde-escuro">Aceita parcelamento direto</p>
              <p className="text-xs text-stone-400">Aparece o badge "Parcela Direto" no site</p>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-5">Características</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { campo: 'quartos' as const, label: 'Quartos', placeholder: '0' },
              { campo: 'banheiros' as const, label: 'Banheiros', placeholder: '0' },
              { campo: 'vagas' as const, label: 'Vagas de garagem', placeholder: '0' },
              { campo: 'area_m2' as const, label: 'Área (m²)', placeholder: '0' },
            ].map((c) => (
              <div key={c.campo}>
                <label className="block text-xs font-medium text-stone-500 mb-1.5">{c.label}</label>
                <input
                  type="number"
                  value={form[c.campo]}
                  onChange={(e) => set(c.campo, e.target.value)}
                  placeholder={c.placeholder}
                  min="0"
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-verde-escuro text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-5">Descrição</h2>
          <textarea
            value={form.descricao}
            onChange={(e) => set('descricao', e.target.value)}
            placeholder="Descreva o imóvel com detalhes: localização, diferenciais, estado de conservação, proximidade da praia..."
            rows={5}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-verde-escuro resize-none"
          />
        </div>

        {/* Fotos */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-2">Fotos do imóvel</h2>
          <p className="text-stone-400 text-xs mb-4">
            Mínimo 1 foto · Máximo 20 fotos · A primeira foto será a capa
          </p>

          {/* Upload area */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-200 hover:border-verde-escuro rounded-xl p-8 cursor-pointer transition-colors group mb-4">
            <div className="w-12 h-12 bg-stone-50 group-hover:bg-verde-escuro/5 rounded-xl flex items-center justify-center transition-colors">
              <ImagePlus size={22} className="text-stone-400 group-hover:text-verde-escuro transition-colors" />
            </div>
            <span className="text-sm font-medium text-stone-500 group-hover:text-verde-escuro transition-colors">
              Clique para adicionar fotos
            </span>
            <span className="text-xs text-stone-400">JPG, PNG — até 10MB cada</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onDropFotos}
              className="hidden"
            />
          </label>

          {/* Prévia das fotos */}
          {todasFotosExibir.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {fotosExistentes.map((url, i) => (
                <div key={url} className="relative group aspect-square rounded-xl overflow-hidden bg-stone-100">
                  <Image src={url} alt={`Foto ${i + 1}`} fill className="object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-verde-escuro text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      Capa
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removerFotoExistente(url)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {previews.map((url, i) => (
                <div key={url} className="relative group aspect-square rounded-xl overflow-hidden bg-stone-100">
                  <Image src={url} alt={`Nova foto ${i + 1}`} fill className="object-cover" />
                  <span className="absolute bottom-1 left-1 bg-dourado text-verde-escuro text-[10px] px-1.5 py-0.5 rounded font-semibold">
                    Nova
                  </span>
                  <button
                    type="button"
                    onClick={() => removerNovaFoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status e Destaque */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="font-semibold text-verde-escuro mb-5">Publicação</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {(['ativo', 'inativo'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set('status', s)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-medium border capitalize transition-all ${
                      form.status === s
                        ? s === 'ativo'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-stone-500 text-white border-stone-500'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    {s === 'ativo' ? 'Ativo (visível)' : 'Inativo'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Destaque na home</label>
              <button
                type="button"
                onClick={() => set('destaque', !form.destaque)}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                  form.destaque
                    ? 'bg-dourado/10 border-dourado text-dourado-escuro'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                }`}
              >
                {form.destaque ? '⭐ Aparece na home' : 'Não aparece na home'}
              </button>
            </div>
          </div>
        </div>

        {/* Prévia do card */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <button
            type="button"
            onClick={() => setPreviewCard(!previewCard)}
            className="flex items-center gap-2 text-sm font-medium text-verde-medio hover:text-verde-escuro transition-colors"
          >
            <Eye size={16} />
            {previewCard ? 'Ocultar' : 'Ver'} prévia do card
          </button>

          {previewCard && (
            <div className="mt-4 max-w-xs">
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
                <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center relative">
                  {todasFotosExibir[0] ? (
                    <Image
                      src={todasFotosExibir[0]}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-stone-300 text-sm">Sem foto</span>
                  )}
                  <span className="absolute top-3 left-3 bg-verde-escuro text-white text-xs px-2.5 py-1 rounded-full">
                    {TIPOS_IMOVEL.find((t) => t.value === form.tipo)?.label}
                  </span>
                  {form.parcelamento_direto && (
                    <span className="absolute top-3 right-3 bg-dourado text-verde-escuro text-xs font-bold px-2 py-1 rounded-full">
                      Parcela Direto
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-playfair font-semibold text-verde-escuro text-base leading-snug line-clamp-2 mb-1">
                    {form.titulo || 'Título do imóvel'}
                  </p>
                  <p className="text-xl font-bold text-verde-escuro">{precoFormatado}</p>
                  {form.entrada_sugerida && form.parcelamento_direto && (
                    <p className="text-xs text-dourado-escuro mt-0.5">
                      Entrada a partir de {formatarPreco(Number(form.entrada_sugerida))}
                    </p>
                  )}
                  <p className="text-xs text-stone-400 mt-2">
                    {form.bairro && `${form.bairro}, `}{form.cidade}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão salvar */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/imoveis"
            className="px-6 py-3 border border-stone-200 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {salvando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {salvando ? 'Salvando...' : isEdicao ? 'Salvar alterações' : 'Publicar imóvel'}
          </button>
        </div>
      </div>
    </div>
  )
}
