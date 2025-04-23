import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonWithSpinnerProps {
  isLoading: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loadingMessage?: string;
  variant?: "solid" | "outline";
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({
  isLoading,
  onClick,
  children,
  disabled = false,
  loadingMessage = "Please Wait...",
  variant = "solid",
  icon,
  type = "button",
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    solid: `bg-purple-600 text-white hover:bg-purple-700 ${
      isLoading ? "cursor-not-allowed" : "hover:shadow-lg"
    }`,
    outline: `border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 ${
      isLoading ? "cursor-not-allowed" : ""
    }`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          {loadingMessage && <span className="text-sm">{loadingMessage}</span>}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

export default ButtonWithSpinner;