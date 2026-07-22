import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider transition-colors uppercase focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-champagne text-obsidian font-bold',
        outline:
          'border-champagne/40 text-champagne bg-champagne/10',
        secondary:
          'border-transparent bg-obsidian-700 text-neutral-300',
        destructive:
          'border-transparent bg-red-900/40 text-red-300 border-red-800',
        success:
          'border-transparent bg-emerald-950/60 text-emerald-300 border-emerald-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
