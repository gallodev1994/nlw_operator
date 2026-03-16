"use client";

import { useEffect, useRef, useState } from "react";
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
  maxLines?: number;
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = false,
  filename,
  className,
  maxLines = 10,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [html, setHtml] = useState<string>("");
  const lines = code.split("\n");
  const hasMoreLines = lines.length > maxLines;

  const displayCode =
    isExpanded || !hasMoreLines ? code : lines.slice(0, maxLines).join("\n");

  useEffect(() => {
    let cancelled = false;

    codeToHtml(displayCode, {
      lang: language,
      theme: "github-dark",
    }).then((result) => {
      if (!cancelled) {
        setHtml(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [displayCode, language]);

  if (!html) {
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
            minHeight: "60px",
          }}
        />
      </div>
    );
  }

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
      >
        {showLineNumbers && (
          <div className="flex">
            <div className="flex-shrink-0 select-none py-2 pl-2 pr-3 text-right text-gray-500 text-sm font-mono leading-6 border-r border-gray-700 bg-gray-800/50">
              {displayCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div
              className="flex-1 p-2 font-mono text-sm leading-6"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
        {!showLineNumbers && (
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
      {hasMoreLines && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-center text-sm text-gray-400 hover:text-gray-300 bg-gray-800/50 border-t border-gray-700 rounded-b-lg transition-colors"
        >
          {isExpanded
            ? "Show less"
            : `Show more (+${lines.length - maxLines} lines)`}
        </button>
      )}
    </div>
  );
}
