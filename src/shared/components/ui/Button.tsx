import React from 'react';

type ButtonProps = {
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'inverted'
    | 'inverted-outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      children,
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      default:
        'bg-brand text-white shadow-sm hover:bg-brand-secondary hover:shadow-brand-glow',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline:
        'border border-ink/15 text-ink bg-transparent hover:border-brand hover:text-brand',
      secondary: 'bg-surface-muted text-ink hover:bg-brand-tertiary/40',
      ghost: 'text-ink hover:bg-surface-muted',
      link: 'underline-offset-4 hover:underline text-brand',
      // For use on brand-colored / dark backgrounds
      inverted: 'bg-white text-brand shadow-sm hover:bg-white/90',
      'inverted-outline':
        'border border-white/40 text-white bg-transparent hover:bg-white/10',
    };

    const sizes = {
      default: 'h-11 py-2 px-5 text-sm',
      sm: 'h-9 px-3.5 text-sm rounded-lg',
      lg: 'h-12 px-7 text-base rounded-xl',
      icon: 'h-10 w-10',
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';



export { Button };
export default Button;
