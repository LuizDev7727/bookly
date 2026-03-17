# Bookly — Minha Biblioteca

Aplicação web para gerenciar sua biblioteca pessoal. Adicione, edite, remova e filtre livros, acompanhe seu status de leitura e avalie cada título com estrelas.

---

## Tecnologias

### Core
| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 8 | Bundler / dev server |
| Tailwind CSS | 4 | Estilização |

### Formulários e validação
| Tecnologia | Papel |
|---|---|
| React Hook Form | Gerenciamento de formulários |
| Zod | Validação de schemas |
| @hookform/resolvers | Integração RHF + Zod |

### Estado e dados
| Tecnologia | Papel |
|---|---|
| TanStack Query (React Query) v5 | Fetching, cache e mutações |
| Axios | Cliente HTTP |
| nuqs | Estado sincronizado com query params da URL |

### UI
| Tecnologia | Papel |
|---|---|
| Base UI (`@base-ui/react`) | Componentes headless acessíveis |
| Lucide React | Ícones |
| CVA (class-variance-authority) | Variantes de componentes |

### Testes
| Tecnologia | Papel |
|---|---|
| Cypress 15 | Testes E2E |
| @faker-js/faker | Geração de dados falsos nos testes |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── ui/                    # Componentes base (Button, Input, Dialog, Select...)
│   ├── add-book-dialog.tsx    # Dialog para adicionar livro
│   ├── add-book-form.tsx      # Formulário de adição
│   ├── update-book-dialog.tsx # Dialog para editar livro
│   ├── update-book-form.tsx   # Formulário de edição (pré-preenchido)
│   ├── delete-book-dialog.tsx # Dialog de confirmação de exclusão
│   ├── book-list.tsx          # Lista com infinite scroll
│   ├── book-list-card.tsx     # Card individual de livro
│   ├── book-list-empty.tsx    # Estado vazio da lista
│   └── book-filters.tsx       # Filtros por título/autor e status
├── http/                      # Funções de requisição HTTP
├── schemas/                   # Schemas Zod (add-book, update-book)
├── type/                      # Tipos TypeScript (Book)
├── providers.tsx              # React Query provider
└── App.tsx                    # Componente raiz

cypress/
└── e2e/
    ├── add-book.cy.ts
    ├── update-book.cy.ts
    ├── delete-book.cy.ts
    └── get-books.cy.ts
```

---

## Funcionalidades

- **Listar livros** — grade responsiva com infinite scroll (12 itens por página)
- **Adicionar livro** — título, autor, URL de capa, status, avaliação em estrelas e comentário
- **Editar livro** — formulário pré-preenchido com os dados atuais do livro
- **Excluir livro** — dialog de confirmação antes de remover permanentemente
- **Filtrar** — busca por título/autor e filtro por status (Lido, Lendo, Quero Ler)
- **Avaliação** — 1 a 5 estrelas com botão para limpar a seleção

---

## Instalação e execução

### Pré-requisitos

- Node.js 18+
- pnpm

### Instalar dependências

```bash
pnpm install
```

### Rodar em desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de produção

```bash
pnpm build
pnpm preview
```

---

## Testes E2E com Cypress

Os testes cobrem os principais fluxos da aplicação de ponta a ponta, rodando diretamente no browser contra a aplicação em execução local.

### Pré-requisito

A aplicação precisa estar rodando antes de executar os testes:

```bash
pnpm dev
```

### Executar os testes

```bash
# Modo interativo — abre o Cypress App com hot reload
pnpm cypress open

# Modo headless — ideal para CI/CD
pnpm cypress run
```

---

### Suítes de teste

#### `add-book.cy.ts` — Adicionar livro

| Teste | O que valida |
|---|---|
| should open the add book dialog | Dialog abre ao clicar em "Adicionar Livro" |
| should fill and submit the form successfully | Preenchimento completo e submissão com sucesso |
| should show validation error for invalid image URL | Mensagem de erro para URL de imagem inválida |
| should show validation error when status is not selected | Mensagem de erro quando status não é selecionado |
| should submit with zero stars when no rating is selected | Submissão sem avaliação (0 estrelas) é aceita |
| should clear stars when X button is clicked | Botão limpar zera todas as estrelas selecionadas |

#### `update-book.cy.ts` — Editar livro

| Teste | O que valida |
|---|---|
| should open the edit dialog | Dialog de edição abre ao clicar em "Editar" |
| should have the form pre-filled with the book data | Formulário carrega com os dados do livro existente |
| should update the book title successfully | Novo título aparece na lista após salvar |
| should show validation error for invalid image URL | Mensagem de erro para URL inválida na edição |

#### `delete-book.cy.ts` — Excluir livro

| Teste | O que valida |
|---|---|
| should open the delete confirmation dialog | Dialog abre exibindo o nome do livro e aviso de ação irreversível |
| should cancel deletion and keep the book | "Cancelar" fecha o dialog e mantém o livro na lista |
| should delete the book when confirming | Confirmar exclusão remove o livro da lista |

#### `get-books.cy.ts` — Listagem de livros

| Teste | O que valida |
|---|---|
| should display the book list | Lista exibe ao menos um card ao carregar a página |
| should display up to 12 books on the first page | Primeira página carrega no máximo 12 livros |
| should display book info on each card | Card exibe título, autor e ações (Editar / Excluir) |
| should load more books when scrolling to the bottom | Scroll até o fim da página dispara o carregamento de mais livros |

---

### Estratégia de seletores

Os testes evitam acoplamento a classes CSS ou textos que podem mudar. Elementos críticos de formulário usam `data-testid`:

| `data-testid` | Elemento |
|---|---|
| `status-select` | Trigger do select de status no formulário de adição |
| `submit-add-book` | Botão de submissão do formulário de adição |
| `clear-stars` | Botão que limpa a avaliação em estrelas |

Cards de livro são selecionados via `div.rounded-xl` (estrutura do `BookListCard`). O título do livro dentro do card é acessado via `p.font-semibold`, permitindo capturar o valor dinamicamente para asserções como verificar que o item permanece ou desaparece da lista.
