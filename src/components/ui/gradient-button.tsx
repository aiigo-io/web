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
  const baseClasses = "relative font-medium rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };
  
  const variantClasses = {
    default: "text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500 before:rounded-full before:-z-10 before:transition-colors hover:before:from-indigo-600 hover:before:via-purple-600 hover:before:to-pink-600",
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
      <span className="relative z-10">{children}</span>
    </button>
  );
}; 