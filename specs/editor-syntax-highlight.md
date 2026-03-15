# Especificação: Editor de Código com Syntax Highlight

## 1. Visão Geral

Editor de código com syntax highlighting automático e manual, similar ao ray.so. Permite que o usuário cole código e receba highlighting automático baseado na linguagem detectada, com opção de seleção manual.

## 2. Análise de Referências

### 2.1 Ray.so (https://github.com/raycast/ray-so)

O ray.so é uma ferramenta de criação de snippets de código com as seguintes características:

- **Stack**: Next.js + Shiki para syntax highlighting
- **Temas**: Utiliza temas do VS Code (github-dark, nord, etc.)
- **Features**: Exportação de imagens, temas personalizáveis, janelas estilo macOS
- **Rendering**: Server-side rendering com Shiki

### 2.2 Alternativas de Libraries

| Library | Uso | Tamanho | Linguagens | Detecção Auto | Mantida |
|---------|-----|---------|------------|--------------|---------|
| **Shiki** | SSR/Build time | ~600KB | 200+ | ❌ | ✅ Ativa |
| **highlight.js** | Client/Server | ~500KB | 190+ | ✅ | ✅ Ativa |
| **PrismJS** | Client | ~2MB | 300+ | ❌ | ⚠️ Estagnada |
| **react-syntax-highlighter** | Client | ~2MB | 190+ | ✅ | ✅ Ativa |

### 2.3 Libraries de Detecção de Linguagem

| Library | Abordagem | Tamanho | Precisão | Notas |
|---------|-----------|---------|----------|-------|
| **flourite** | Heurística/Estatística | Pequeno | Boa | Suporta Shiki, TypeScript |
| **highlight.js** | Keyword matching | Médio | Média | Já incluso no bundle |
| **guesslang-js** | ML/TensorFlow | Grande | Alta | Baseado em modelo treinado |
| **lang-detector** | Heurística | Pequeno | Média | Apenas 9 linguagens |

## 3. Decisão Técnica

### Stack Recomendado

1. **Syntax Highlighting**: `shiki` (já instalado no projeto)
   - Vantagens: mesmo motor do VS Code, Themes completos, zero JS cliente
   - Integração existente com o projeto (CodeBlock)

2. **Detecção de Linguagem**: `flourite`
   - Pequeno, sem dependências externas
   - Suporta modo `shiki: true` para retornar linguagens compatíveis
   - Alternativa: usar `highlight.js` (já seria um segundo bundle)

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                 CodeEditor (Client)                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Mode: Highlight em Tempo Real                       │    │
│  │                                                      │    │
│  │  ┌────────────────────────────────────────────────┐  │    │
│  │  │  Textarea (entrada) + Overlay (highlight)      │  │    │
│  │  │  - Text transparent, caret visível              │  │    │
│  │  │  - Highlighted code por trás                   │  │    │
│  │  └────────────────────────────────────────────────┘  │    │
│  │                                                      │    │
│  │  Debounce: ~300ms                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  LanguageDetector (client-side)                      │    │
│  │  - flourite (recomendado)                          │    │
│  │  - Executa onPaste e onBlur                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Shiki (client-side com cache)                      │    │
│  │  - codeToHtml com cache para linguagens já usadas   │    │
│  │  - Tema: github-dark                                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Nota**: Para highlight em tempo real, o Shiki será usado client-side (diferente do CodeBlock que é server-side).

## 4. Requisitos Funcionais

### 4.1 Entrada de Código
- Área de texto para colar/editar código
- Suporte a indentation com Tab
- Linha números (opcional)
- Tamanho mínimo de 18 linhas (configurável)

### 4.2 Detecção Automática
- Detectar linguagem automaticamente:
  - **Ao digitar código** (evento onChange)
  - **Ao colar código** (evento onPaste)
  - **Ao perder foco** (evento onBlur)
- Supported languages: TypeScript, JavaScript, Python, Go, Rust, Java, C++, HTML, CSS, JSON, SQL, Ruby, PHP, Swift, Kotlin, Markdown, YAML, Shell/Bash
- Fallback para "plaintext" se não detectada

### 4.2.1 Regras de Detecção de Linguagem

#### TypeScript
- `import ... from` - Import statements
- `export default function/class/const` - Export declarations
- `interface \w+` - Interface declarations
- `type \w+ =` - Type aliases
- `: string|number|boolean|any|void|never` - Type annotations
- `<\w+>` - Generic types
- `const \w+ = \(.*\) =>` - Arrow functions
- `async function` - Async functions

#### JavaScript
- `import '...'` - Import without specifier
- `const \w+ = require` - CommonJS
- `module.exports` - CommonJS exports
- `console.log|error|warn` - Console methods
- `document.\w+` - DOM API
- `window.\w+` - Window API

#### Python
- `def \w+\(` - Function definitions
- `class \w+:` - Class definitions
- `import \w+$` - Import statements
- `from \w+ import` - From imports
- `print\(` - Print function
- `if __name__ == '__main__'` - Main block
- `self.\w+` - Instance methods

#### Go
- `package main` - Main package
- `import \(` - Import block
- `func (\w+ *?\w+)? \w+\(` - Function declarations
- `fmt\.(Print|Sprintf|Errorf)` - Format package
- `:=` - Short variable declaration

#### Rust
- `fn \w+` - Function definitions
- `use \w+::` - Use declarations
- `impl \w+` - Implementations
- `struct \w+` - Struct definitions
- `enum \w+` - Enum definitions
- `let mut` - Mutable variables
- `println!` - Macro calls

#### Java
- `public class \w+` - Class declarations
- `private (static)?` - Access modifiers
- `System.out.print` - Output
- `public static void main` - Main method
- `import java.` - Java imports

#### C++
- `#include <` - Preprocessor includes
- `using namespace std` - Namespace
- `std::\w+` - Standard library
- `cout <<` - Output stream
- `cin >>` - Input stream
- `nullptr` - Null pointer

#### HTML
- `<!DOCTYPE html>` - DOCTYPE
- `<html` - HTML tag
- `<head` - Head tag
- `<body` - Body tag
- `<div` - Div tags
- `</\w+>` - Closing tags

#### CSS
- `\w+: [\w#.]+;` - Property declarations
- `@media` - Media queries
- `@import` - Imports
- `\{ [\w-]+:` - Rule sets
- `.\w+ \{` - Class selectors
- `#\w+ \{` - ID selectors

#### JSON
- `\{[\s\S]*"[\w]+":\s*` - Object with string keys
- `\[[\s\S]*\{` - Array of objects
- `"[\w]+":\s*[[{]` - Nested structures

#### SQL
- `SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER` - DML/DDL commands
- `FROM \w+` - From clause
- `WHERE \w+` - Where clause
- `JOIN \w+ ON` - Join clause

#### Ruby
- `require '...'` - Require statements
- `class \w+ <` - Class inheritance
- `def \w+` - Method definitions
- `end$` - End keyword
- `puts` - Output

#### PHP
- `<\?php` - PHP opening tag
- `\$\w+ =` - Variables
- `function \w+\(` - Functions
- `->\w+` - Method calls

#### Swift
- `import Foundation` - Foundation import
- `import UIKit` - UIKit import
- `func \w+\(` - Function definitions
- `var \w+:\s*\w+` - Variable declarations
- `let \w+:\s*\w+` - Constant declarations
- `guard let` - Guard statements
- `if let` - Optional binding

#### Kotlin
- `package \w+` - Package declaration
- `fun \w+` - Function definitions
- `val \w+ =` - Val declarations
- `var \w+ =` - Var declarations
- `println\(` - Print function

#### Markdown
- `^#{1,6}\s+` - Headers
- `\[[\w\s]+\]\(http` - Links
- `` ```\w* `` - Code blocks
- `\*\w+\*` - Emphasis

#### YAML
- `^[\w-]+:\s+` - Key-value pairs
- `^-\s+\w+` - List items

#### Shell/Bash
- `#!/bin/bash|sh|zsh` - Shebang
- `#!` - Shebang
- `\$\(\w+\)` - Command substitution
- `\$\w+` - Variables
- `echo ` - Echo command
- `if \[\s+` - If statements

#### Dockerfile
- `FROM \w+` - Base image
- `RUN ` - Run command
- `CMD ` - Command
- `COPY ` - Copy command
- `WORKDIR ` - Working directory
- `EXPOSE ` - Expose port

#### C#
- `using System` - System using
- `namespace \w+` - Namespace
- `public|private|protected|internal (class|interface|struct)` - Type declarations
- `Console.Write` - Console output
- `async Task` - Async methods

### 4.3 Seleção Manual
- Dropdown na interface para selecionar linguagem
- **Lista Moderada**: Top 20 linguagens (TypeScript, JavaScript, Python, Go, Rust, Java, C++, HTML, CSS, JSON, SQL, Ruby, PHP, Swift, Kotlin, Markdown, YAML, Shell, Dockerfile, C#)
- Persistência opcional

### 4.4 Syntax Highlighting
- **Modo em tempo real**: Highlight aplicado conforme o usuário digita/colao código
- Aplicar cores conforme linguagem detectada/selecionada
- Tema escuro (github-dark) como padrão
- Renderização server-side via Shiki (com cache client-side)

### 4.5 Interface
- Header com:
  - Nome do arquivo (opcional)
  - Indicador de linguagem detectada/selecionada
  - Seletor de linguagem (dropdown)
- Corpo com:
  - Número de linhas
  - Código com highlighting

## 5. To-Dos para Implementação

- [ ] **TASK-001**: Avaliar se usaremos `flourite` ou `highlight.js` para detecção automática
  - *Pendente*: Testar precisão de ambos com código de exemplo
  - *Critério*: Precisão > 80% nas linguagens mais comuns

- [ ] **TASK-002**: Criar componente `LanguageSelector`
  - Componente de dropdown com Top 20 linguagens
  - Suporte a estado controlado e não-controlado

- [ ] **TASK-003**: Integrar detecção automática no `CodeEditor`
  - Detectar linguagem ao colar código (evento onPaste)
  - Detectar linguagem ao perder foco (evento onBlur)

- [ ] **TASK-004**: Implementar highlight em tempo real
  - Usar Shiki client-side com cache
  - Debounce para evitar lag durante digitação (~300ms)
  - Mostrar código colorido enquanto edita

- [ ] **TASK-005**: Configurar temas do Shiki
  - Suporte a tema único (github-dark) inicial
  - Preparar infraestrutura para temas adicionais (futuro)

- [ ] **TASK-006**: Implementar detecção server-side (opcional)
  - Para casos onde detecção client-side falha
  - API route para detecção via Shiki

## 6. Decisões Tomadas

- **Modo de Visualização**: Highlight em tempo real conforme o usuário digita
- **Lista de Linguagens**: Top 20 (moderado)
- **Detecção Automática**: Ao colar (onPaste) e ao perder foco (onBlur)

## 7. Dependências

### Existentes

```json
{
  "dependencies": {
    "shiki": "^4.0.2"  // Já instalado
  }
}
```

### Novas dependências necessárias (recomendadas)

```json
{
  "dependencies": {
    "flourite": "^1.3.0"  // Detecção de linguagem leve
  }
}
```

### Alternativa (sem nova dependência)

Usar `highlight.js` para detecção (já seria necessário verificar se vale a pena adicionar ao bundle). A detecção pode ser feita via `hljs.highlightAuto(code).language`.

## 8. Referências

- [Shiki Documentation](https://shiki.style)
- [Ray.so GitHub](https://github.com/raycast/ray-so)
- [flourite npm](https://www.npmjs.com/package/flourite)
- [highlight.js](https://highlightjs.org/)
