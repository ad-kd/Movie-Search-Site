import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import '../css/Toast.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ 
                                    opacity: 0, 
                                    x: isMobile ? 0 : 50, 
                                    y: isMobile ? 50 : 0,
                                    scale: 0.9 
                                }}
                                animate={{ 
                                    opacity: 1, 
                                    x: 0, 
                                    y: 0, 
                                    scale: 1 
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    transition: { duration: 0.2 } 
                                }}
                                className={`toast toast-${toast.type}`}
                            >
                                <div className="toast-content">
                                    <div className="toast-icon">
                                        {toast.type === 'success' ? <Check size={14} /> : <X size={14} />}
                                    </div>
                                    <span className="toast-message">{toast.message}</span>
                                </div>
                                <motion.div 
                                    className="toast-progress"
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
