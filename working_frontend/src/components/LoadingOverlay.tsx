import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = "Loading...",
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          {/* Spinner */}
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
            {/* Inner spinner */}
            <div className="w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full absolute inset-0 animate-spin"></div>
          </div>

          {/* Message */}
          <p className="mt-4 text-gray-700 font-medium text-center">
            {message}
          </p>
        </div>

        {/* Purple accent bar at the bottom */}
        <div className="h-1 bg-purple-600 absolute bottom-0 left-0 w-full"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;