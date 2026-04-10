import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] space-y-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              className={`flex items-center space-x-4 p-4 rounded-2xl shadow-2xl glass min-w-[300px] border-l-4 ${
                toast.type === 'success' ? 'border-green-500' : 
                toast.type === 'error' ? 'border-red-500' : 'border-blue-500'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
              {toast.type === 'error' && <XCircle className="h-6 w-6 text-red-500" />}
              {toast.type === 'info' && <Info className="h-6 w-6 text-blue-500" />}
              
              <div className="flex-grow">
                 <p className="text-sm font-bold text-black">{toast.message}</p>
              </div>

              <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
