"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";
import {
  detectLanguage,
  getLanguageName,
  type LanguageId,
} from "./language-detector";
import { LanguageSelector } from "./language-selector";

const codeEditorVariants = tv({
  base: "relative flex flex-col rounded-lg overflow-hidden border border-gray-700 h-full",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CodeEditorVariants = VariantProps<typeof codeEditorVariants>;

interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  language?: LanguageId;
  onLanguageChange?: (language: LanguageId) => void;
  filename?: string;
  size?: "sm" | "md" | "lg";
  showLineNumbers?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  cols?: number;
  minLines?: number;
  autoDetect?: boolean;
}

export const CodeEditor = ({
  value: controlledValue,
  defaultValue = "",
  onChange,
  language: controlledLanguage,
  onLanguageChange,
  filename,
  size,
  showLineNumbers = true,
  className,
  minLines = 18,
  autoDetect = true,
  ...props
}: CodeEditorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [detectedLanguage, setDetectedLanguage] = useState<LanguageId>(
    controlledLanguage ?? "typescript",
  );
  const [hasDetected, setHasDetected] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const isLanguageControlled = controlledLanguage !== undefined;
  const currentLanguage =
    isLanguageControlled && !hasDetected
      ? controlledLanguage
      : detectedLanguage;

  const rawLines = currentValue.split("\n");
  const displayLines =
    rawLines.length < minLines
      ? [...rawLines, ...Array(minLines - rawLines.length).fill("")]
      : rawLines;

  const highlightCode = useCallback(async (code: string, lang: LanguageId) => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = setTimeout(async () => {
      if (!code.trim()) {
        setHighlightedHtml("");
        return;
      }

      try {
        const html = await codeToHtml(code, {
          lang,
          theme: "github-dark",
        });
        setHighlightedHtml(html);
      } catch {
        setHighlightedHtml("");
      }
    }, 16);
  }, []);

  useEffect(() => {
    highlightCode(currentValue, currentLanguage);
  }, [currentValue, currentLanguage, highlightCode]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handleLanguageDetect = useCallback(
    (code: string) => {
      if (autoDetect && code.trim().length >= 10) {
        const detected = detectLanguage(code);
        setDetectedLanguage(detected);
        setHasDetected(true);
        onLanguageChange?.(detected);
        highlightCode(code, detected);
      }
    },
    [autoDetect, onLanguageChange, highlightCode],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      handleLanguageDetect(newValue);
    },
    [isControlled, onChange, handleLanguageDetect],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pastedText = e.clipboardData.getData("text");
      handleLanguageDetect(pastedText);
    },
    [handleLanguageDetect],
  );

  const handleBlur = useCallback(() => {
    handleLanguageDetect(currentValue);
  }, [currentValue, handleLanguageDetect]);

  const handleLanguageSelect = useCallback(
    (newLanguage: LanguageId) => {
      setDetectedLanguage(newLanguage);
      onLanguageChange?.(newLanguage);
      highlightCode(currentValue, newLanguage);
    },
    [onLanguageChange, highlightCode, currentValue],
  );

  const handleScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const highlightedLines = useMemo(() => {
    if (!highlightedHtml) return [];
    const match = highlightedHtml.match(/<code[^>]*>([\s\S]*)<\/code>/);
    if (!match) return [];
    const codeContent = match[1];
    return codeContent.split("\n");
  }, [highlightedHtml]);

  return (
    <div className={codeEditorVariants({ size, className })}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-xs text-gray-400">{filename}</span>
          ) : (
            <ul className="flex gap-2">
              <li className="h-2 w-2 bg-red-500 rounded-full"></li>
              <li className="h-2 w-2 bg-yellow-500 rounded-full"></li>
              <li className="h-2 w-2 bg-green-500 rounded-full"></li>
            </ul>
          )}
        </div>
        <div className="flex items-center gap-3">
          {autoDetect && (
            <span className="text-xs text-gray-500">
              {hasDetected
                ? `Detected: ${getLanguageName(currentLanguage)}`
                : "Auto-detect on paste"}
            </span>
          )}
          <LanguageSelector
            value={currentLanguage}
            onChange={handleLanguageSelect}
            size="sm"
            showLabel={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] flex-1 overflow-hidden min-h-0 relative">
        {showLineNumbers && (
          <div className="bg-gray-800 border-r border-gray-700 select-none overflow-hidden min-h-0">
            <div className="pr-2 pl-2 text-right text-gray-500 text-sm leading-6 font-mono h-full">
              {displayLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}

        <div className="relative min-h-0 overflow-auto">
          <div
            ref={highlightRef}
            className="absolute inset-0 pointer-events-none font-mono text-sm leading-6 p-4 overflow-hidden whitespace-pre-wrap break-words"
            style={{ color: "#e6edf3" }}
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html:
                highlightedHtml ||
                `<pre><code>${currentValue || "&nbsp;"}</code></pre>`,
            }}
          />
          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleChange}
            onPaste={handlePaste}
            onBlur={handleBlur}
            onScroll={handleScroll}
            className="min-h-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm leading-6 p-4 resize-none focus:outline-none focus:ring-0 border-none overflow-auto whitespace-pre-wrap break-words"
            spellCheck={false}
            style={{ position: "relative", zIndex: 1 }}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};
