import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border font-medium transition-colors",
  variants: {
    variant: {
      success: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      error: "bg-red-100 text-red-800 border-red-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
      neutral: "bg-gray-100 text-gray-800 border-gray-200",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

type BadgeProps = ComponentProps<"span"> &
  BadgeVariants & {
    className?: string;
  };

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, size, className })} {...props} />
  );
}
