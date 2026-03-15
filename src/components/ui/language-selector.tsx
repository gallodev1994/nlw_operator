"use client";

import { Select } from "@base-ui/react/select";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import {
  getLanguageName,
  type LanguageId,
  SUPPORTED_LANGUAGES,
} from "./language-detector";

const languageSelectorVariants = tv({
  variants: {
    size: {
      sm: "min-h-7 text-xs px-2 py-1",
      md: "min-h-8 text-sm px-3 py-1.5",
      lg: "min-h-10 text-base px-4 py-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type LanguageSelectorVariants = VariantProps<typeof languageSelectorVariants>;

interface LanguageSelectorProps {
  value?: LanguageId;
  onChange?: (value: LanguageId) => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const LanguageSelector = React.forwardRef<
  HTMLButtonElement,
  LanguageSelectorProps
>(({ value, onChange, size = "md", showLabel = true, className }, ref) => {
  const [internalValue, setInternalValue] = React.useState<LanguageId>(
    value ?? "typescript",
  );

  const currentValue = value ?? internalValue;

  const handleValueChange = (newValue: string | null) => {
    if (!newValue) return;
    const lang = newValue as LanguageId;
    setInternalValue(lang);
    onChange?.(lang);
  };

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-gray-500 text-xs uppercase tracking-wide">
          Lang:
        </span>
      )}
      <Select.Root value={currentValue} onValueChange={handleValueChange}>
        <Select.Trigger
          ref={ref}
          className={`flex items-center gap-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors cursor-pointer ${languageSelectorVariants({ size, className })}`}
        >
          <Select.Value>
            {currentValue ? (
              <span className="font-medium">
                {getLanguageName(currentValue)}
              </span>
            ) : (
              <span className="text-gray-500">Select...</span>
            )}
          </Select.Value>
          <Select.Icon className="text-gray-400">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <Select.Popup className="z-50 min-w-[calc(var(--anchor-width)+1rem)] origin-[var(--transform-origin)] rounded-md bg-gray-800 border border-gray-700 shadow-lg outline-none">
              <Select.List className="max-h-[var(--available-height)] overflow-y-auto py-1 scroll-py-1">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <Select.Item
                    key={lang.id}
                    value={lang.id}
                    className="cursor-pointer px-3 py-1.5 text-sm text-gray-300 outline-none select-none data-[highlighted]:bg-gray-700 data-[highlighted]:text-white"
                  >
                    <Select.ItemIndicator className="absolute right-2">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText>{lang.name}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
});

LanguageSelector.displayName = "LanguageSelector";

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
