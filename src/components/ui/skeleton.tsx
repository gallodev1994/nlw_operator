import { tv } from "tailwind-variants";

const skeletonVariants = tv({
  base: "animate-pulse bg-gray-700 rounded",
  variants: {
    variant: {
      default: "",
      circular: "rounded-full",
    },
    size: {
      sm: "h-4 w-16",
      md: "h-6 w-24",
      lg: "h-8 w-32",
      xl: "h-12 w-48",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type SkeletonProps = {
  className?: string;
  variant?: "default" | "circular";
  size?: "sm" | "md" | "lg" | "xl";
};

export function Skeleton({ className, variant, size }: SkeletonProps) {
  return <div className={skeletonVariants({ variant, size, className })} />;
}
