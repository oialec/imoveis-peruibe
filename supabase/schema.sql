-- ============================================================
-- SCHEMA SQL — IMOBILIÁRIA PERUÍBE
-- Cole este SQL no Supabase SQL Editor (https://app.supabase.com)
-- ============================================================

-- ─────────────────────────────────────────
-- 1. TABELA PRINCIPAL: imoveis
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.imoveis (
  id                UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo            TEXT          NOT NULL,
  slug              TEXT          UNIQUE NOT NULL,
  tipo              TEXT          NOT NULL CHECK (tipo IN ('casa','apartamento','terreno','comercial')),
  cidade            TEXT          NOT NULL DEFAULT 'Peruíbe',
  bairro            TEXT,
  preco             NUMERIC(12,2) NOT NULL,
  entrada_sugerida  NUMERIC(12,2),
  parcelamento_direto BOOLEAN     NOT NULL DEFAULT false,
  quartos           INTEGER       NOT NULL DEFAULT 0,
  banheiros         INTEGER       NOT NULL DEFAULT 0,
  vagas             INTEGER       NOT NULL DEFAULT 0,
  area_m2           NUMERIC(10,2),
  descricao         TEXT,
  status            TEXT          NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','inativo')),
  destaque          BOOLEAN       NOT NULL DEFAULT false,
  fotos             TEXT[]        NOT NULL DEFAULT '{}',
  criado_em         TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- Índices para buscas frequentes
CREATE INDEX idx_imoveis_status  ON public.imoveis (status);
CREATE INDEX idx_imoveis_tipo    ON public.imoveis (tipo);
CREATE INDEX idx_imoveis_cidade  ON public.imoveis (cidade);
CREATE INDEX idx_imoveis_destaque ON public.imoveis (destaque) WHERE destaque = true;
CREATE INDEX idx_imoveis_slug    ON public.imoveis (slug);

-- ─────────────────────────────────────────
-- 2. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────

-- Habilitar RLS
ALTER TABLE public.imoveis ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode ler imóveis ativos (site público)
CREATE POLICY "imoveis_public_read"
  ON public.imoveis
  FOR SELECT
  USING (status = 'ativo');

-- Apenas usuários autenticados (a corretora) podem fazer tudo
CREATE POLICY "imoveis_auth_all"
  ON public.imoveis
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────
-- 3. STORAGE BUCKET para fotos
-- ─────────────────────────────────────────

-- Criar bucket público para fotos dos imóveis
INSERT INTO storage.buckets (id, name, public)
VALUES ('imoveis-fotos', 'imoveis-fotos', true)
ON CONFLICT (id) DO NOTHING;

-- Qualquer pessoa pode ver as fotos (público)
CREATE POLICY "fotos_public_read"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'imoveis-fotos');

-- Apenas autenticados podem fazer upload/delete
CREATE POLICY "fotos_auth_upload"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'imoveis-fotos');

CREATE POLICY "fotos_auth_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'imoveis-fotos');

-- ─────────────────────────────────────────
-- 4. DADOS DE EXEMPLO (opcional, remova em produção)
-- ─────────────────────────────────────────

INSERT INTO public.imoveis (titulo, slug, tipo, cidade, bairro, preco, entrada_sugerida, parcelamento_direto, quartos, banheiros, vagas, area_m2, descricao, status, destaque, fotos)
VALUES
  (
    'Casa de Praia com 3 Quartos — Vista Mar',
    'casa-praia-3-quartos-vista-mar',
    'casa', 'Peruíbe', 'Bairro das Praias',
    320000.00, 50000.00, true,
    3, 2, 2, 180.00,
    'Linda casa a 200m do mar, com área de churrasco, piscina e garagem coberta. Imóvel em excelente estado de conservação, ideal para moradia ou temporada.',
    'ativo', true, '{}'
  ),
  (
    'Apartamento 2 Quartos no Centro',
    'apartamento-2-quartos-centro',
    'apartamento', 'Peruíbe', 'Centro',
    185000.00, 30000.00, true,
    2, 1, 1, 68.00,
    'Apartamento no coração de Peruíbe, a 5 minutos da praia. Condomínio com portaria 24h, área de lazer e churrasqueira.',
    'ativo', true, '{}'
  ),
  (
    'Terreno Plano 300m² em Condomínio',
    'terreno-plano-300m2-condominio',
    'terreno', 'Peruíbe', 'Jardim Peruíbe',
    95000.00, 15000.00, true,
    0, 0, 0, 300.00,
    'Terreno plano, documentação completa, em condomínio fechado com infraestrutura completa. Ótima oportunidade para construir a casa dos seus sonhos.',
    'ativo', true, '{}'
  ),
  (
    'Casa 2 Quartos a 3 Quadras do Mar',
    'casa-2-quartos-3-quadras-mar',
    'casa', 'Peruíbe', 'Bairro das Graças',
    215000.00, 35000.00, true,
    2, 1, 1, 120.00,
    'Casa espaçosa com quintal, nascente, silenciosa e arborizada. Perfeita para família.',
    'ativo', false, '{}'
  );

-- ─────────────────────────────────────────
-- FIM DO SCHEMA
-- ─────────────────────────────────────────
