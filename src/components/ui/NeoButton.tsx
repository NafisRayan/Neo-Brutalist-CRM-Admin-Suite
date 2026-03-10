import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'green' | 'pink' | 'black';
  children?: ReactNode;
  className?: string;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white text-black dark:bg-slate-700 dark:text-white',
    yellow: 'bg-neo-yellow text-black',
    green: 'bg-neo-green text-black',
    pink: 'bg-neo-pink text-black',
    black: 'bg-black text-white dark:bg-slate-900',
  };

  return (
    <button 
      {...props}
      className={`neo-border neo-shadow-sm font-black uppercase tracking-widest px-4 py-2 neo-transition ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};
