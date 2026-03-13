import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
  base: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-gray-900 data-[unchecked]:bg-gray-200",
  variants: {
    size: {
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const switchThumbVariants = tv({
  base: "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform data-[checked]:translate-x-full data-[unchecked]:translate-x-0",
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SwitchVariants = VariantProps<typeof switchVariants>;

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> &
  SwitchVariants & {
    className?: string;
  };

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={switchVariants({ size, className })}
        {...props}
      >
        <SwitchPrimitive.Thumb className={switchThumbVariants({ size })} />
      </SwitchPrimitive.Root>
    );
  },
);

Switch.displayName = "Switch";
