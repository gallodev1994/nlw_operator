# Padrão de Especificações (Specs)

Este documento define o formato padrão para criação de especificações técnicas no projeto.

## Estrutura de uma Spec

```
specs/
├── AGENTS.md                    # Este arquivo
├── <feature-name>.md            # Arquivo de especificação
```

## Formato do Arquivo de Spec

Cada especificação deve seguir o seguinte estrutura:

### 1. Título

```markdown
# Especificação: <Nome da Feature>
```

### 2. Visão Geral

Descrição breve do que será implementado, contexto do problema e objetivos.

### 3. Análise de Referências

Análise de ferramentas, bibliotecas ou funcionalidades similares existentes.

- **Referências externas**: Links para ferramentas similares (ex: ray.so, Figma, etc.)
- **Comparação de Libraries**: Tabela comparando alternativas com critérios relevantes:
  - Tamanho do bundle
  - Suporte a funcionalidades
  - Ativo/Mantido

### 4. Decisão Técnica

- **Stack Recomendado**: Tecnologia(s) selecionada(s) com justificativa
- **Arquitetura**: Diagrama (ASCII) mostrando fluxo de dados e componentes

### 5. Requisitos Funcionais

Lista detalhada de funcionalidades, organizada em subseções:

- Requisitos de entrada/saída
- Comportamentos esperados
- Edge cases

### 6. To-Dos para Implementação

Lista de tarefas no formato checkbox:

```markdown
- [ ] **TASK-001**: Descrição da tarefa
   - *Pendência*: O que precisa ser definido antes
   - *Critério*: Como validar conclusão
```

### 7. Decisões Tomadas

Resumo das decisões técnicas chave que foram definidas durante a especificação.

### 8. Dependências

Listagem de dependências necessárias:

```json
{
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

### 9. Referências

Links externos relevantes para a implementação.

---

## Convenções

### Nomeação de Arquivos

- Usar kebab-case: `editor-syntax-highlight.md`, `drizzle.md`
- Nome descritivo em inglês ou português conforme preferência da equipe

### Tarefas (Tasks)

- Formato: `TASK-XXX: descrição`
- Manter numeração sequencial dentro da spec

### Tabelas

Usar formato Markdown com pipes `|`:

```markdown
| Coluna 1 | Coluna 2 |
|----------|----------|
| Valor 1  | Valor 2  |
```

### Diagramas

Usar ASCII art para diagramas simples dentro de blocos de código:

```text
┌─────────────┐
│  Componente │
└─────────────┘
```

---

## Exemplo de Uso

Ao criar uma nova especificação:

1. Criar arquivo em `specs/<nome-da-feature>.md`
2. Preencher todas as seções conforme formato acima
3. Incluir tasks pendentes para items a serem definidos
4. Após implementação, tasks podem ser marcadas como concluídas