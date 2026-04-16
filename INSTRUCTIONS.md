# 🎬 CineDash

Dashboard de curadoria de filmes construído com React, TypeScript e TanStack.

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <SEU_REPO>
cd cinedash
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_BEARER_TOKEN=SEU_TOKEN_TMDB
```

> O token pode ser obtido em: https://developer.themoviedb.org

---

### 4. Rode a aplicação

```bash
npm run dev
```

Acesse: http://localhost:5173

---

## 🧪 Rodar testes

```bash
npm run test
```

---

## 🔐 Autenticação

A autenticação é simulada:

* Validação com Zod
* Token fictício gerado no login
* Persistência via Zustand + localStorage
* Proteção de rotas via layout protegido

---

## 🎯 Funcionalidades implementadas

* Login com validação
* Dashboard com:

  * Busca com debounce
  * Filtros por gênero, ano e rating
  * Paginação
* Detalhes do filme:

  * Informações completas
  * Elenco
  * Trailer
* Watchlist:

  * Adicionar/remover filmes
  * Persistência
  * Tabela com ordenação
* Tema:

  * Dark / Light mode persistido

---

## 🧠 Tecnologias utilizadas

* React 18 + TypeScript (strict)
* Vite
* TanStack Query
* Zustand
* TanStack Router
* TailwindCSS + shadcn/ui
* React Hook Form + Zod
* TanStack Table
* Vitest + Testing Library

---

## 📌 Observações

* Foco em arquitetura escalável e separação de responsabilidades
* Tipagem forte com Zod para garantir segurança de dados da API
* Persistência de estado com middleware do Zustand
* Cache e sincronização com TanStack Query
* Testes focados em regras de negócio críticas
