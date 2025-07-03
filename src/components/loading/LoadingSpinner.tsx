import React from 'react';
import { Film } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Загрузка...' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-red-500 border-t-transparent rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-4 h-4 text-red-500" />
        </div>
      </div>
      <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 mt-4 font-medium`}>
        {text}
      </p>
    </div>
  );
};

export default React.memo(LoadingSpinner);