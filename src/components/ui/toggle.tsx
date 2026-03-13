import { Switch } from "@base-ui/react/switch";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toggleVariants = tv({
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-transparent hover:bg-gray-100",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      ghost: "bg-transparent hover:bg-gray-100",
    },
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
    pressed: {
      true: "bg-gray-900 text-white hover:bg-gray-800 [&[data-state=on]]:bg-gray-900 [&[data-state=on]]:text-white",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      pressed: true,
      class: "border-gray-900",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

type ToggleProps = ComponentProps<typeof Switch.Root> &
  ToggleVariants & {
    className?: string;
  };

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Switch.Root
        ref={ref}
        className={toggleVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);

Toggle.displayName = "Toggle";
