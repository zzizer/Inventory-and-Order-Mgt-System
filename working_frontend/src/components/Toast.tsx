import React, { useState, useEffect, createContext, useContext } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

// Types for Toast
type ToastType = "success" | "error" | "info" | "warning";

// Toast message interface
interface ToastMessage {
  id: number;
  message: string;
  type?: ToastType;
  duration?: number;
}

// Toast context interface
interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Component
const Toast: React.FC<ToastMessage & { onClose: () => void }> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  // Icons for different toast types
  const icons = {
    success: <CheckCircle2 className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
  };

  // Color schemes for different toast types
  const colorSchemes = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: "text-green-500",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: "text-red-500",
    },
    info: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: "text-purple-500",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      icon: "text-yellow-500",
    },
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const { bg, border, text, icon } = colorSchemes[type];

  return (
    <div
      className={`
        fixed top-4 inset-x-0 
        z-50 max-w-md w-full 
        mx-auto
        ${bg} ${border} ${text}
        border rounded-xl shadow-lg 
        p-4 flex items-center space-x-3
        transition-all duration-300 ease-in-out
        transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
      `}
    >
      <div className={`${icon}`}>{icons[type]}</div>
      <div className="flex-grow">
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="hover:bg-gray-100 rounded-full p-1 transition-colors"
      >
        <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 3000
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex flex-col items-center space-y-2 pt-4">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook for using toast
export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default Toast;