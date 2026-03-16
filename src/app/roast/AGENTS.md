# Roast Result Page

## Overview
Page that displays the result of a code roast analysis with score, detailed analysis, and suggested fixes.

## Route
- Path: `/roast/[id]`
- Type: Server Component
- Dynamic Parameter: `id` (UUID)

## Features

### Header
- Title: "Resultado" with green `//` prefix

### Score Card (AnalysisCard)
- Variant: ghost (transparent background)
- Shows:
  - Score ring with gradient based on percentage:
    - 0-30%: red
    - 31-50%: yellow
    - 51%+: green
  - Title: "Score Total"
  - Label: "Pontos"
  - Description: "Avaliação geral do código"
  - Language (e.g., "TypeScript")
  - Line count (e.g., "4 linhas")

### Submission Section
- Title: "your_submision" with green `//` prefix
- Displays submitted code with syntax highlighting

### Detailed Analysis Section
- Title: "detailed_analysis" with green `//` prefix
- Grid layout: 2 columns
- Analysis items with severity levels:
  - **critical** (🔴): red background/border
  - **warning** (🟡): yellow background/border
  - **ok** (🟢): green background/border
- Each item contains:
  - Severity badge
  - Title
  - Description

### Suggested Fix Section
- Title: "suggested_fix" with green `//` prefix
- Shows before/after code comparison (SuggestedFix component)

## Data Structure
```typescript
interface AnalysisItem {
  type: "critical" | "warning" | "ok";
  title: string;
  description: string;
}

interface RoastResult {
  id: string;
  score: number;
  language: string;
  lineCount: number;
  code: string;
  analysisItems: AnalysisItem[];
  suggestedFixBefore: string;
  suggestedFixAfter: string;
}
```

## Components Used
- AnalysisCard (ui/analysis-card)
- SuggestedFix (ui/diff-block)
- ScoreRing (ui/score-ring)

## Related Files
- `src/app/roast/[id]/page.tsx` - Main page component
- `src/components/ui/analysis-card.tsx` - Analysis card with score
- `src/components/ui/score-ring.tsx` - Score ring with gradient colors
- `src/components/ui/diff-block.tsx` - Before/after code comparison
