# 🏠 Imóveis Peruíbe — Site de Corretora com Parcelamento Direto

Site completo para corretora autônoma em Peruíbe, SP.  
Stack: **Next.js 14 + Tailwind CSS + Supabase + Vercel**

---

## ✅ Funcionalidades

- **Site público**: Home, listagem com filtros, página de imóvel, sobre, como funciona
- **Parcelamento direto** como diferencial em destaque em toda navegação
- **Painel admin**: dashboard, cadastro e edição de imóveis com upload de fotos
- **Mobile first**: carrossel com swipe, sticky bar com preço e WhatsApp
- **SEO**: metadata dinâmica por página, slugs amigáveis

---

## 🚀 Passo a passo para subir o projeto

### 1. Clonar e instalar

```bash
git clone https://github.com/seu-usuario/imoveis-peruibe.git
cd imoveis-peruibe
npm install
```

### 2. Criar projeto no Supabase

1. Acesse [app.supabase.com](https://app.supabase.com) e crie um novo projeto
2. Vá em **SQL Editor** e cole o conteúdo de `supabase/schema.sql`
3. Clique em **Run** — isso criará a tabela, policies e o bucket de fotos

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o `.env.local` com seus dados:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_WHATSAPP_NUMBER=5513999999999
NEXT_PUBLIC_NOME_CORRETORA=Ana Paula Souza
NEXT_PUBLIC_CRECI=123456-F
NEXT_PUBLIC_ANO_INICIO=2010
```

**Onde encontrar as chaves Supabase:**  
Supabase → seu projeto → Settings → API → `URL` e `anon public`

### 4. Criar usuário admin no Supabase

1. Supabase → Authentication → Users → **Add user**
2. Informe o email e senha da corretora
3. ⚠️ Não há cadastro pelo site — acesso apenas por aqui

### 5. Rodar localmente

```bash
npm run dev
```

Acesse:
- **Site público**: http://localhost:3000
- **Painel admin**: http://localhost:3000/admin
- **Login admin**: http://localhost:3000/admin/login

---

## 📦 Deploy na Vercel

### Opção 1 — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Opção 2 — GitHub (recomendado)

1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project → importe o repositório
3. Em **Environment Variables**, adicione as mesmas variáveis do `.env.local`
4. Clique em **Deploy**

---

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx                    # Página inicial
│   ├── sobre/page.tsx              # Quem sou eu
│   ├── imoveis/
│   │   ├── page.tsx                # Listagem com filtros
│   │   └── [slug]/page.tsx         # Página do imóvel
│   ├── como-funciona/page.tsx      # Explicação + FAQ
│   └── admin/
│       ├── page.tsx                # Dashboard
│       ├── login/page.tsx          # Login
│       └── imoveis/
│           ├── page.tsx            # Listar todos
│           ├── novo/page.tsx       # Criar imóvel
│           └── [id]/editar/        # Editar imóvel
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BotaoWhatsApp.tsx       # Botão flutuante
│   ├── ui/
│   │   ├── CardImovel.tsx          # Card reutilizável
│   │   ├── GaleriaFotos.tsx        # Carousel com swipe
│   │   └── Paginacao.tsx
│   ├── sections/
│   │   └── FiltrosForm.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       └── FormularioImovel.tsx    # Form completo com upload
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client
│   │   └── server.ts               # Server client
│   ├── imoveis.ts                  # Queries no banco
│   └── utils.ts                    # Formatações, slug, WhatsApp
├── types/index.ts                  # Tipos TypeScript
└── middleware.ts                   # Proteção de rota /admin
```

---

## 🎨 Paleta de cores

| Cor | Hex |
|-----|-----|
| Verde escuro (principal) | `#1a3c2e` |
| Verde médio | `#2d6a4f` |
| Dourado | `#c9a84c` |
| Creme (fundo) | `#faf8f3` |

Fontes: **Playfair Display** (títulos) + **Inter** (corpo)

---

## 📱 Mobile first

- Menus em hambúrguer no celular
- Carrossel de fotos com swipe (Embla Carousel)
- Sticky bottom bar na página do imóvel (preço + WhatsApp sempre visíveis)
- Fontes de input ≥ 16px (evita zoom no iPhone)
- Botão flutuante de WhatsApp 60×60px fixo

---

## 🔒 Segurança

- Rota `/admin` protegida por middleware (redirect para `/admin/login`)
- RLS (Row Level Security) no Supabase:
  - Leitura pública apenas de imóveis `status = 'ativo'`
  - Escrita apenas para usuários autenticados
- Bucket de fotos público para leitura, restrito para upload

---

## 🛠️ Personalizar

Para colocar a foto real da corretora, substitua o placeholder nos componentes  
`Header.tsx`, `Footer.tsx`, `sobre/page.tsx` e `FormularioImovel.tsx` por:

```tsx
<Image src="/corretora.jpg" alt="Nome da corretora" fill className="object-cover" />
```

E coloque `corretora.jpg` na pasta `/public`.

---

*Projeto desenvolvido com Next.js 14 App Router + Supabase + Tailwind CSS*
