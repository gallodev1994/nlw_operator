# Especificação: Integração Drizzle ORM

## 1. Visão Geral

Este documento descreve o plano de ação para integração do projeto **devroast** com **Drizzle ORM** utilizando PostgreSQL.

### Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| ORM | Drizzle ORM |
| Database | PostgreSQL 16 (Docker) |
| AI SDK | Vercel AI (provider-agnóstico) |
| Autenticação | Anônima com sessões |

---

## 2. Estrutura do Banco de Dados

### 2.1 Entidades

```
src/db/
├── schema/
│   ├── users.ts          # Usuários anônimos
│   ├── sessions.ts       # Sessões de autenticação
│   ├── roasts.ts         # Códigos enviados + resultado
│   ├── roast_scores.ts   # Análise detalhada
│   ├── leaderboard.ts    # Rankings automáticos
│   ├── ai_configs.ts    # Configurações de providers IA
│   ├── analytics.ts     # Estatísticas globais
│   └── index.ts         # Exports
├── index.ts             # Conexão PostgreSQL
```

### 2.2 Tabelas

#### `users`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| anonymous_id | text | UUID único do usuário |
| display_name | text | Nickname opcional |
| avatar_url | text | Avatar opcional |
| is_anonymous | boolean | Sempre true |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

#### `sessions`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | text | Session ID (PK) |
| user_id | integer | FK → users.id |
| expires_at | timestamp | Data de expiração |
| ip_address | text | IP do cliente |
| user_agent | text | User agent |
| is_valid | boolean | Sessão ativa |
| created_at | timestamp | Data de criação |

#### `roasts`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| user_id | integer | FK → users.id |
| code | text | Código enviado |
| language | text | Linguagem detectada |
| line_count | integer | Número de linhas |
| roast_mode | boolean | true=brutal, false=construtivo |
| score | integer | 0-100 |
| verdict | enum | Categoria do código |
| roast_quote | text | Citação principal |
| suggested_fix | text | Código corrigido |
| model_used | text | Modelo IA utilizado |
| tokens_used | integer | Tokens consumidos |
| processing_time | integer | Tempo (ms) |
| is_public | boolean | Visibilidade pública |
| view_count | integer | Visualizações |
| created_at | timestamp | Data de criação |

#### `roast_scores`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| roast_id | integer | FK → roasts.id |
| overall_score | integer | Score geral |
| code_quality | integer | 0-100 |
| code_quality_severity | enum | critical/warning/good |
| security | integer | 0-100 |
| security_severity | enum | critical/warning/good |
| performance | integer | 0-100 |
| performance_severity | enum | critical/warning/good |
| readability | integer | 0-100 |
| readability_severity | enum | critical/warning/good |
| best_practices | integer | 0-100 |
| best_practices_severity | enum | critical/warning/good |
| issues | jsonb | Array de issues |
| created_at | timestamp | Data de criação |

#### `leaderboard`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| roast_id | integer | FK → roasts.id |
| rank_type | enum | worst/best/most_roasted/recent |
| rank | integer | Posição no ranking |
| period | text | daily/weekly/all_time |
| score | integer | Score usado para ordenação |
| ranked_at | timestamp | Data de entrada |
| is_active | boolean | Entrada ativa |

#### `ai_configs`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| name | text | Nome para display |
| provider | enum | openai/anthropic/google/openrouter/ai-gateway |
| model | text | Identificador do modelo |
| api_key | text | Chave API (criptografada) |
| base_url | text | URL base customizada |
| max_tokens | integer | Limite de tokens |
| temperature | integer | Temperatura (0-2) |
| is_active | boolean | Ativo |
| is_default | boolean | Provider padrão |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

#### `analytics`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | serial | PK |
| date | timestamp | Data do registro |
| total_roasts | bigint | Total de roasts |
| total_users | bigint | Total de usuários |
| total_tokens_used | bigint | Total de tokens |
| average_score | integer | Média de score |
| created_at | timestamp | Data de criação |

---

## 3. Enums

### verdictEnum
| Valor | Descrição | Score Range |
|-------|-----------|-------------|
| `need_serious_help` | Precisa de ajuda séria | 0-20 |
| `rough_around_edges` | Tem potencial mas precisa ajustes | 21-40 |
| `decent_code` | Código decente | 41-60 |
| `solid_work` | Trabalho sólido | 61-80 |
| `exceptional` | Excepcional | 81-100 |

### severityEnum
| Valor | Descrição |
|-------|-----------|
| `critical` | Problema crítico |
| `warning` | Aviso |
| `good` | Bom |

### leaderboardTypes
| Valor | Descrição |
|-------|-----------|
| `worst` | Piores códigos |
| `best` | Melhores códigos |
| `most_roasted` | Mais visualizados |
| `recent` | Mais recentes |

### providerTypes
| Valor | Descrição |
|-------|-----------|
| `openai` | OpenAI (GPT) |
| `anthropic` | Anthropic (Claude) |
| `google` | Google (Gemini) |
| `openrouter` | OpenRouter (múltiplos modelos) |
| `ai-gateway` | Vercel AI Gateway |

---

## 4. Configurações

### 4.1 Drizzle Config

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 4.2 Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast

# AI Providers
AI_PROVIDER=ai-gateway
AI_GATEWAY_URL=https://gateway.aihub.com/v1
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

### 4.3 Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 5. Decisões de Design

### 5.1 Casing
- **snake_case**: Nomes de colunas no banco (`created_at`)
- **camelCase**: Nomes no TypeScript (`createdAt`)
- Drizzle converte automaticamente

### 5.2 Relations
- **Sem relations nativas** do Drizzle
- Queries manuais com SQL/joins explícitos
- Exemplo:
  ```typescript
  const result = await db.execute`
    SELECT r.*, u.anonymous_id 
    FROM roasts r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.is_public = true
  `;
  ```

### 5.3 Índices
- PostgreSQL cria índices automaticamente para PK e FK
- **Sem índices customizados** por padrão
- Adicionar apenas se necessário (após profiling)

---

## 6. Fluxos

### 6.1 Autenticação Anônima

```
User → Generate UUID → POST /api/auth/anonymous 
→ Create Session → Set HTTPOnly Cookie → Done
```

### 6.2 Criar Roast

```
User → POST /api/roast (with cookie)
→ Validate Session → Get User
→ AI SDK (generateText) → Parse Result
→ INSERT roast → UPDATE leaderboard
→ Return Result
```

### 6.3 Leaderboard Automático

```
After INSERT roast:
→ Calculate new rank (worst = lowest score)
→ INSERT into leaderboard
→ Return updated ranking
```

---

## 7. Comandos

### 7.1 Setup

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Instalar dependências
npm install

# Gerar migrations
npx drizzle-kit generate

# Executar migrations
npx drizzle-kit migrate
```

### 7.2 Desenvolvimento

```bash
# Studio (UI para explorar DB)
npx drizzle-kit studio

# Pull (gerar schema de DB existente)
npx drizzle-kit pull
```

---

## 8. Dependências

### package.json

```json
{
  "dependencies": {
    "drizzle-orm": "^0.40.0",
    "pg": "^8.11.0",
    "ai": "^4.0.0",
    "@ai-sdk/openai": "^1.0.0",
    "@ai-sdk/anthropic": "^1.0.0",
    "@ai-sdk/google": "^1.0.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.30.0",
    "@types/pg": "^8.10.0"
  }
}
```

---

## 9. Próximos Passos

- [ ] Executar `docker-compose up -d`
- [ ] Executar `npm install`
- [ ] Executar `npx drizzle-kit generate`
- [ ] Executar `npx drizzle-kit migrate`
- [ ] Implementar autenticação anônima
- [ ] Implementar API de roast
- [ ] Configurar AI SDK provider factory

---

## 10. Referências

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Drizzle Kit](https://kit.drizzle.team)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [AI Gateway](https://vercel.com/docs/ai-gateway)
