# Especificação: tRPC Integration

## 1. Visão Geral

Implementar tRPC como camada de API typesafe para o projeto Next.js 16, integrado com Server Components usando `createCaller`. O tRPC permitirá chamadas tipadas entre o frontend e backend sem necessidade de API routes HTTP, utilizando chamadas diretas no servidor.

## 2. Referências

- [tRPC Server Components](https://trpc.io/docs/client/tanstack-react-query/server-components)
- [tRPC Setup](https://trpc.io/docs/client/tanstack-react-query/setup)
- [tRPC Server Side Calls](https://trpc.io/docs/server/server-side-calls)

## 3. Decisão Técnica

### Stack
- **tRPC v11** - Tiposafe API layer
- **Zod** - Validação de input

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     Server Components                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  createCaller(ctx) → caller.procedure()             │    │
│  │  - Chamadas diretas no servidor                    │    │
│  │  - Tipos inferidos automaticamente                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      tRPC Server                             │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │   roast     │ │ leaderboard │ │    auth     │            │
│  │   router    │ │   router    │ │   router    │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                              │
│  ┌─────────────┐                                            │
│  │   users     │                                            │
│  │   router    │                                            │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Drizzle ORM / PostgreSQL                 │
└─────────────────────────────────────────────────────────────┘
```

## 4. Estrutura de Arquivos

```
src/
├── server/
│   ├── trpc.ts              # initTRPC, createTRPCContext, helpers
│   └── routers/
│       ├── _app.ts          # AppRouter (agregador)
│       ├── roast.ts         # CRUD roasts
│       ├── leaderboard.ts   # Rankings
│       ├── auth.ts          # Sessões anônimas
│       └── users.ts         # Usuários
└── lib/
    └── trpc.ts              # createCaller export
```

## 5. Requisitos Funcionais

### 5.1 roast Router
- `list({ limit?, offset?, isPublic? })` - Lista roasts paginada
- `getById({ id })` - Detalhe por ID
- `create({ ... })` - Criar roast (mutation)
- `getByUser({ userId })` - Roasts de um usuário
- `incrementViewCount({ id })` - Incrementar visualizações

### 5.2 leaderboard Router
- `getLeaderboard({ type, period, limit })` - Rankings
- `getTop({ type, limit })` - Top N
- `getStats()` - Estatísticas globais

### 5.3 auth Router
- `createSession({ displayName? })` - Criar sessão anônima
- `getOrCreateAnonymous({ anonymousId })` - Buscar ou criar usuário

### 5.4 users Router
- `getProfile({ anonymousId })` - Perfil do usuário
- `getById({ id })` - Buscar por ID
- `updateProfile({ anonymousId, displayName?, avatarUrl? })` - Atualizar perfil

## 6. To-Dos para Implementação

- [x] **TASK-001**: Criar `src/server/trpc.ts`
- [x] **TASK-002**: Criar `src/server/routers/roast.ts`
- [x] **TASK-003**: Criar `src/server/routers/leaderboard.ts`
- [x] **TASK-004**: Criar `src/server/routers/auth.ts`
- [x] **TASK-005**: Criar `src/server/routers/users.ts`
- [x] **TASK-006**: Criar `src/server/routers/_app.ts`
- [x] **TASK-007**: Criar `src/lib/trpc.ts`
- [x] **TASK-008**: Atualizar pages para usar caller

## 7. Decisões Tomadas

- **Chamadas server-side**: Usar `createCaller` ao invés de API route HTTP
- **Autenticação**: Permite sessões anônimas (sem validação de auth)
- **Client-side**: Opcional - mutations podem usar Server Actions

## 8. Dependências

```json
{
  "dependencies": {
    "@trpc/server": "^11.0.0",
    "@trpc/client": "^11.0.0",
    "zod": "^3.23.0"
  }
}
```

## 9. Uso

### Server Components

```tsx
import { createCaller } from "@/lib/trpc";
import { createTRPCContext } from "@/server/trpc";

export default async function Page() {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const data = await caller.roast.list({ limit: 10 });
}
```

### Tipos Inferidos

Os tipos de input e output são automaticamente inferidos:

```tsx
type RoastListInput = RouterInputs["roast"]["list"];
type RoastListOutput = RouterOutputs["roast"]["list"];
```

## 10. Referências

- https://trpc.io/docs/client/tanstack-react-query/server-components
- https://trpc.io/docs/server/server-side-calls