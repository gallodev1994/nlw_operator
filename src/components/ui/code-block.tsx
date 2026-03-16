//import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { tv } from "tailwind-variants";

const codeBlockVariants = tv({
  base: "overflow-x-auto rounded-lg",
});

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
  className?: string;
}

export async function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="relative">
      {filename && (
        <div className="flex items-center gap-2 rounded-t-lg border-b border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-400">
          <span className="font-mono">{filename}</span>
        </div>
      )}
      <div
        className={codeBlockVariants({ className })}
        style={{
          backgroundColor: "#24292e",
        }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
