import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/common/lib/utils';

// Button variants with your global tokens
const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center rounded-primary font-semibold transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ' +
  'disabled:opacity-60 disabled:cursor-not-allowed select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive:
          'bg-destructive/80 text-white hover:bg-destructive/90',
        outline:
          'border border-border bg-background hover:bg-surface-hover',
        secondary:
          'bg-secondary text-text-on-secondary hover:bg-secondary-hover',
        ghost:
          'bg-transparent hover:bg-surface-hover text-text-primary',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline',
        icon: 'bg-transparent p-0',
        text: 'bg-transparent p-0 text-text-primary hover:text-primary',
      },
      size: {
        default: 'h-12 px-4 py-4 text-base',
        sm: 'h-9 py-2.5 px-3 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          children && iconPosition === 'left' && 'mr-2',
          children && iconPosition === 'right' && 'ml-2'
        )}
      >
        {React.isValidElement(icon) ? icon : React.createElement(icon)}
      </span>
    );
  };

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        loading && 'cursor-wait opacity-70',
        className
      )}
      disabled={loading || props.disabled}
      aria-label={`button-${children}`}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></span>
      )}
      {iconPosition === 'left' && !loading && renderIcon()}
      {children}
      {iconPosition === 'right' && !loading && renderIcon()}
    </Comp>
  );
};

export { Button, buttonVariants };
