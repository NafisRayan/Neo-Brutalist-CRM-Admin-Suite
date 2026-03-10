import React, { HTMLAttributes, ReactNode } from 'react';

export interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', title, ...props }) => (
  <div {...props} className={`bg-white dark:bg-slate-800 dark:text-white neo-border-thick neo-shadow p-6 ${className}`}>
    {title && <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{title}</h3>}
    {children}
  </div>
);
