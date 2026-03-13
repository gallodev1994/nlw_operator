import { tv, type VariantProps } from "tailwind-variants";
import { ScoreRing } from "./score-ring";

const analysisCardVariants = tv({
  base: "rounded-lg border bg-white p-6 shadow-sm",
  variants: {
    variant: {
      default: "border-gray-200",
      outline: "border-gray-300",
      ghost: "border-transparent shadow-none bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AnalysisCardVariants = VariantProps<typeof analysisCardVariants>;

interface AnalysisCardProps extends AnalysisCardVariants {
  title: string;
  score: number;
  maxScore?: number;
  label?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function AnalysisCard({
  title,
  score,
  maxScore = 100,
  label = "Score",
  description,
  variant,
  className,
  children,
}: AnalysisCardProps) {
  return (
    <div className={analysisCardVariants({ variant, className })}>
      <div className="flex items-start gap-4">
        <ScoreRing score={score} maxScore={maxScore} label={label} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
