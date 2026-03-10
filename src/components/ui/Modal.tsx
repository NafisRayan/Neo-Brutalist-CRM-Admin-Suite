import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, onClose, children }: ModalProps) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-slate-800 dark:text-white neo-border-thick neo-shadow-lg w-full max-w-md p-8 relative"
    >
      <button onClick={onClose} className="absolute top-4 right-4 hover:rotate-90 transition-transform dark:text-white">
        <X size={24} />
      </button>
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{title}</h3>
      {children}
    </motion.div>
  </div>
);
