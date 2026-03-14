import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const tableVariants = tv({
  base: "w-full",
  variants: {
    variant: {
      default: "",
      bordered: "border border-gray-500 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TableVariants = VariantProps<typeof tableVariants>;

type TableProps = ComponentProps<"div"> &
  TableVariants & {
    className?: string;
  };

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={tableVariants({ variant, className })}
        {...props}
      >
        <ul className="divide-y divide-gray-200">{children}</ul>
      </div>
    );
  },
);

Table.displayName = "Table";

type TableHeaderProps = ComponentProps<"li">;

export const TableHeader = forwardRef<HTMLLIElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("bg-gray-400 border-b border-gray-500", className)}
        {...props}
      >
        <ul className="grid grid-cols-4 divide-x divide-gray-500">
          {children}
        </ul>
      </li>
    );
  },
);

TableHeader.displayName = "TableHeader";

type TableBodyProps = ComponentProps<"li">;

export const TableBody = forwardRef<HTMLLIElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(className)} {...props}>
        {children}
      </li>
    );
  },
);

TableBody.displayName = "TableBody";

type TableRowProps = ComponentProps<"ul">;

export const TableRow = forwardRef<HTMLUListElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("grid grid-cols-4 divide-x divide-gray-200", className)}
        {...props}
      >
        {children}
      </ul>
    );
  },
);

TableRow.displayName = "TableRow";

type TableHeadProps = ComponentProps<"li">;

export const TableHead = forwardRef<HTMLLIElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-sm font-medium text-gray-600",
          className,
        )}
        {...props}
      >
        {children}
      </li>
    );
  },
);

TableHead.displayName = "TableHead";

type TableCellProps = ComponentProps<"li">;

export const TableCell = forwardRef<HTMLLIElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("px-4 py-3 text-sm text-gray-500", className)}
        {...props}
      >
        {children}
      </li>
    );
  },
);

TableCell.displayName = "TableCell";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
