import React from 'react';
import { Film, Search } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'film' | 'search';
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'film',
  title = 'Ничего не найдено',
  message = 'Попробуйте изменить параметры поиска',
  actionText,
  onAction
}) => {
  const IconComponent = icon === 'search' ? Search : Film;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <IconComponent className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {message}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default React.memo(EmptyState);