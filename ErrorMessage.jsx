import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8 px-4">
      <div className="flex items-center space-x-3 text-red-400">
        <AlertCircle className="w-6 h-6" />
        <span className="text-lg font-medium">Error</span>
      </div>
      
      <p className="text-gray-300 text-center max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;