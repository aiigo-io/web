import React from 'react';
import { cn } from '../../lib/utils';

type GradientButtonProps = {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  onClick,
  ...props
}) => {
  const baseClasses = "group relative font-medium rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };
  
  const variantClasses = {
    default: "text-white bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.6)]",
    outline: "text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Gradient Border and Fill for Default Variant */}
      {variant === 'default' && (
        <>
          <div className="absolute inset-0 p-[1px] rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-indigo-500/[0.25] via-[#08080a] to-rose-500/[0.25] -z-10 group-hover:from-indigo-500/[0.4] group-hover:to-rose-500/[0.4] transition-all duration-500">
            {/* Subtle inner highlight/glass effect */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}; 