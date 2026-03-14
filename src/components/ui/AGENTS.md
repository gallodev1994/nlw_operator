# UI Components - Development Patterns

## Stack
- **Tailwind CSS v4** - Styling
- **tailwind-variants** - Variant-based components (v3.x)
- **tailwind-merge** - Internal conflict resolution (used by tailwind-variants)
- **@radix-ui/react-toggle** - Accessible toggle primitive
- **shiki** - Syntax highlighting (server-side)

## Components Catalog

### Button
- **File:** `button.tsx`
- **Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`
- **Sizes:** `sm`, `md`, `lg`, `icon`
- **Props:** `variant`, `size`, `fullWidth`

```tsx
<Button variant="primary">Click me</Button>
<Button variant="outline" size="sm">Small</Button>
<Button fullWidth>Full width</Button>
```

### Toggle
- **File:** `toggle.tsx`
- **Dependency:** `@radix-ui/react-toggle`
- **Variants:** `default`, `outline`, `ghost`
- **Sizes:** `sm`, `md`, `lg`
- **Props:** `pressed`, `defaultPressed`, `onPressedChange`

```tsx
<Toggle variant="outline" defaultPressed>
  <BoldIcon />
</Toggle>
<Toggle size="lg" onPressedChange={(pressed) => console.log(pressed)}>
  B
</Toggle>
```

### Badge
- **File:** `badge.tsx`
- **Variants:** `success`, `warning`, `error`, `info`, `neutral`
- **Sizes:** `sm`, `md`, `lg`

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">Failed</Badge>
<Badge variant="info">Processing</Badge>
```

### Card
- **File:** `card.tsx`
- **Components:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Variants:** `default`, `outline`, `ghost`
- **Pattern:** Compound components with `forwardRef`

```tsx
<Card variant="outline">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>
```

### CodeBlock
- **File:** `code-block.tsx`
- **Dependency:** `shiki`
- **Theme:** `github-dark`
- **Props:** `code` (required), `language?`, `showLineNumbers?`, `filename?`
- **Pattern:** Server Component (async)

```tsx
// Server Component - must be async
<CodeBlock
  code="const x = 10;"
  language="typescript"
  filename="example.ts"
/>
```

### CodeEditor
- **File:** `code-editor.tsx`
- **Pattern:** Client Component (interactive)
- **Props:** `value?`, `defaultValue?`, `onChange?`, `language?`, `filename?`, `size?`, `showLineNumbers?`
- **Sizes:** `sm`, `md`, `lg`
- **Features:** Line numbers, tab support, synced scroll

```tsx
// Controlled
<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  filename="example.tsx"
/>

// Uncontrolled
<CodeEditor
  defaultValue="const x = 10;"
  language="javascript"
  size="lg"
/>
```

## Component Creation Patterns

### Pattern 1: Simple Component
Use for single-purpose components extending HTML elements.

**Components:** Button, Badge

```tsx
const componentVariants = tv({
  base: "base-classes",
  variants: {
    variant: { /* ... */ },
    size: { /* ... */ },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ComponentVariants = VariantProps<typeof componentVariants>;

type ComponentProps = ComponentProps<"element"> &
  ComponentVariants & {
    className?: string;
  };

export function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <element
      className={componentVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

### Pattern 2: Compound Component
Use for multi-part components where each part needs independent styling and ref forwarding.

**Components:** Card

```tsx
// Root with variants
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cardVariants({ variant, className })} {...props} />
  )
);

// Sub-components without variants
export const CardHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

### Pattern 3: Radix Primitive Component
Use for accessible components built on Radix UI primitives.

**Components:** Toggle

```tsx
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { forwardRef } from "react";

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  )
);
```

### Pattern 4: Server Component (Async)
Use for components that require server-side processing.

**Components:** CodeBlock

```tsx
// Must be async - uses Shiki's codeToHtml
export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
```

## Key Rules

1. **Named exports** - Always use named exports (`export function Button`, `export const Card`)
2. **TypeScript** - Extend `ComponentProps<"element">` + `VariantProps<typeof variants>`
3. **No manual twMerge** - Pass `className` directly to `tv()` function
4. **Variants** - Use `tv()` from `tailwind-variants` v3.x (not `cva`)
5. **Props spreading** - Always spread remaining props (`...props`)
6. **forwardRef** - Use for DOM components that need ref access
7. **Client Components** - Use `"use client"` directive for interactive components (CodeEditor)
8. **Server Components** - Use `async function` for components with async operations (CodeBlock)

## When to Use Each Pattern

| Pattern | Use Case | Examples |
|---------|----------|----------|
| Simple | Single-purpose, HTML-based | Button, Badge |
| Compound | Multi-part, independent styling | Card, Dialog |
| Radix Primitive | Accessible, complex interactions | Toggle, ToggleGroup |
| Server Component | Async operations, heavy computation | CodeBlock |
| Client Component | Interactive, event handlers | CodeEditor |

## Common Variants Reference

| Prop | Values | Purpose |
|------|--------|---------|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `destructive` | Visual style |
| `size` | `sm`, `md`, `lg`, `icon` | Component size |
| `fullWidth` | `boolean` | Full width toggle |

## Components Showcase Page

The file `src/app/components/page.tsx` displays all components and their variants.

**Sections:**
1. **Buttons** - All variants, sizes, fullWidth
2. **Toggle** - Variants, sizes, states
3. **Badge** - All variants and sizes
4. **Card** - All variants with complete structure
5. **CodeBlock** - TypeScript, JavaScript, JSON examples with filename

**Update Policy:** When adding new components, update the showcase page to include all variants.

## File Naming Convention
- Use lowercase: `button.tsx`, `card.tsx`, `code-block.tsx`
- Match component name: `Button` → `button.tsx`, `CodeBlock` → `code-block.tsx`
- Use kebab-case for multi-word: `code-block.tsx`

## References
- [tailwind-variants Documentation](https://www.tailwind-variants.org/docs/getting-started)
- [tailwind-variants API Reference](https://www.tailwind-variants.org/docs/api-reference)
- [Radix UI Toggle](https://www.radix-ui.com/primitives/docs/components/toggle)
- [Shiki Documentation](https://shiki.style/guide)