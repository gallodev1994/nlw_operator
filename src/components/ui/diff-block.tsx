import { codeToHtml } from "shiki";

interface DiffBlockProps {
  removed?: string;
  added?: string;
  language?: string;
  className?: string;
}

export async function DiffBlock({
  removed,
  added,
  language = "typescript",
  className,
}: DiffBlockProps) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      {removed && (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-red-900/30 flex items-center justify-center">
            <span className="text-red-400 text-xs font-mono">-</span>
          </div>
          <div className="pl-8 pr-4 py-2 bg-red-900/10">
            <pre className="text-red-300 text-sm font-mono whitespace-pre-wrap">
              {removed}
            </pre>
          </div>
        </div>
      )}
      {added && (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-green-900/30 flex items-center justify-center">
            <span className="text-green-400 text-xs font-mono">+</span>
          </div>
          <div className="pl-8 pr-4 py-2 bg-green-900/10">
            <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
              {added}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export async function SuggestedFix({
  before,
  after,
  language = "typescript",
}: {
  before: string;
  after: string;
  language?: string;
}) {
  return (
    <div className="space-y-2">
      <DiffBlock removed={before} added={after} language={language} />
    </div>
  );
}
