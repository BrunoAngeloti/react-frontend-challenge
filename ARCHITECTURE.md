# 🏗 Arquitetura do Projeto

## 🎯 Visão Geral

O projeto foi estruturado com foco em:

* Escalabilidade
* Separação de responsabilidades
* Facilidade de manutenção
* Testabilidade

---

## 📂 Estrutura de Pastas

O projeto segue uma abordagem inspirada em **Feature-Sliced Design (FSD)**:

```txt
src/
  app/        → providers, router, estilos globais
  shared/     → utilitários, config, API base
  entities/   → modelos e regras de domínio (movie, genre)
  features/   → funcionalidades (auth, watchlist, filtros)
  widgets/    → composição de UI (grid, tabela, filtros)
  pages/      → páginas da aplicação
```

---

## 🔐 Autenticação

Como não há backend, a autenticação foi simulada:

* Login validado com Zod
* Token fictício gerado
* Persistência com Zustand (`persist`)
* Controle de acesso via `ProtectedLayout`

Foi implementado controle de hidratação (`hasHydrated`) para evitar loops de renderização.

---

## 📡 Camada de Dados

### TanStack Query

Responsável por:

* Fetch de dados
* Cache
* Sincronização

### Organização:

* `http-client.ts` → cliente HTTP genérico
* `movie-queries.ts` → hooks de dados
* `movie-schemas.ts` → validação com Zod
* `movie-mappers.ts` → transformação de dados

### Decisão importante

Os dados da API são:

* Validados com Zod
* Convertidos para modelos internos

Isso evita acoplamento com a API externa.

---

## 🧠 Gerenciamento de Estado

### Zustand foi dividido em stores específicas:

* `auth-store` → autenticação
* `watchlist-store` → lista de filmes
* `discovery-filters-store` → filtros do dashboard
* `theme-store` → tema

### Motivo:

Evitar um "global state monolítico" e manter responsabilidades isoladas.

---

## 🎛 Dashboard (Discovery)

Separação clara:

* UI → widgets
* Estado → store
* Dados → TanStack Query

### Otimizações:

* Debounce na busca
* `keepPreviousData` para paginação suave
* Query keys com valores primitivos (evita re-render infinito)

---

## 🎬 Watchlist

* Persistência via localStorage
* Estrutura desacoplada do modelo da API
* Uso de TanStack Table para ordenação

### Decisão:

Criar um tipo próprio (`WatchlistMovie`) para evitar dependência direta do modelo da API.

---

## 🎨 Tema (Dark / Light)

* Gerenciado via Zustand
* Persistido
* Aplicado via classe no `html`
* Uso de `@custom-variant` no Tailwind

---

## 🧪 Testes

Cobertura focada em:

* Stores (auth, watchlist, filtros)
* Schema de validação
* Hook de debounce
* Formulário de login

### Filosofia:

Testar regras de negócio críticas ao invés de UI superficial.

---

## ⚠️ Desafios enfrentados

### 1. Loop de renderização (Maximum update depth)

Causa:

* Selector instável no Zustand
* Uso incorreto de objetos em queryKey

Solução:

* Separação de seletores
* Query keys com valores primitivos

---

### 2. Tema não aplicando

Causa:

* Tailwind não reconhecendo `light:` variant

Solução:

* Uso de `@custom-variant` para `light` e `dark`

---

### 3. Persistência + hidratação

Causa:

* Zustand persist inicializando antes da hidratação

Solução:

* Uso de `hasHydrated` para controlar render

---

## 📈 Melhorias futuras

* Infinite scroll no dashboard
* Cache otimista na watchlist
* Melhor acessibilidade (ARIA)
* Testes de integração mais completos
* Skeletons mais refinados
* Lazy loading de rotas

---

## ✅ Conclusão

O projeto foi construído com foco em:

* Código limpo
* Arquitetura escalável
* Boa experiência do usuário
* Uso correto da stack proposta