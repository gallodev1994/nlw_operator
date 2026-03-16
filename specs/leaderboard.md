# Leaderboard Page Specification

## Overview
Page that displays a leaderboard of code submissions with syntax highlighting.

## Route
- Path: `/leaderboard`
- Type: Server Component

## Features

### Header
- Title: "Leaderboard" with green `>` prefix
- Back button (top-right): Returns to home page (`/`)
  - Variant: outline
  - Hover: text-black, cursor-pointer
  - Text: "← Voltar"

### Data Display
- List of leaderboard entries with:
  - Author name (white, font-medium)
  - Rank number (#id) - gray, small text
  - Code block with syntax highlighting (shiki)
  - Supported languages: typescript, javascript, python, go, rust

### Styling
- Background: gray-900
- Card background: gray-800
- Border: gray-700
- Spacing: max-w-4xl mx-auto, p-8

## Data Structure
```typescript
interface LeaderboardEntry {
  id: number;
  author: string;
  language: BundledLanguage;
  code: string;
}
```

## Components Used
- Button (ui/button)
- CodeBlock (ui/code-block)
- Link (next/link)
