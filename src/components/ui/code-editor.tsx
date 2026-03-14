"use client";

import { useCallback, useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

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
  language?: string;
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
}

export const CodeEditor = ({
  value: controlledValue,
  defaultValue = "",
  onChange,
  language,
  filename,
  size,
  showLineNumbers = true,
  className,
  minLines = 18,
  ...props
}: CodeEditorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const rawLines = currentValue.split("\n");
  const displayLines =
    rawLines.length < minLines
      ? [...rawLines, ...Array(minLines - rawLines.length).fill("")]
      : rawLines;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue =
          currentValue.substring(0, start) + "  " + currentValue.substring(end);

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    },
    [currentValue, isControlled, onChange],
  );

  return (
    <div className={codeEditorVariants({ size, className })}>
      {filename ? (
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
          <span className="font-mono text-xs">{filename}</span>
          {language && (
            <span className="text-gray-500 text-xs">({language})</span>
          )}
        </div>
      ) : (
        <div className="h-8">
          <ul className="flex gap-2 mt-3 ml-3">
            <li className="h-2 w-2 bg-red-500 rounded-4xl"></li>
            <li className="h-2 w-2 bg-yellow-500 rounded-4xl"></li>
            <li className="h-2 w-2 bg-green-500 rounded-4xl"></li>
          </ul>
        </div>
      )}
      <div className="grid grid-cols-[auto_1fr] flex-1 overflow-hidden min-h-0">
        {showLineNumbers && (
          <div className="bg-gray-800 border-r border-gray-700 select-none overflow-hidden min-h-0">
            <div className="pr-2 pl-2 text-right text-gray-500 text-sm leading-6 font-mono h-full">
              {displayLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="min-h-0 w-full bg-gray-900 text-gray-500 font-mono text-sm leading-6 p-4 resize-none focus:outline-none focus:ring-0 border-none overflow-auto"
          spellCheck={false}
          {...props}
        />
      </div>
    </div>
  );
};
