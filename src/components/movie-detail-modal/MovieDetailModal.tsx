import React from 'react';
import { X, Star, Calendar, Clock, Play, Heart, Share2 } from 'lucide-react';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';

interface Props {
  movie: IMovie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailModal: React.FC<Props> = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Section */}
          <div className="relative h-64 md:h-80">
            <img
              src={IMAGE_URL + movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Movie Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                <Play className="w-5 h-5 fill-current" />
                <span>Смотреть трейлер</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                <Heart className="w-5 h-5" />
                <span>В избранное</span>
              </button>

              <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                <Share2 className="w-5 h-5" />
                <span>Поделиться</span>
              </button>
            </div>

            {/* Overview */}
            {movie.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Описание</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Жанры</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.budget && movie.budget > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Бюджет</h4>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${movie.budget.toLocaleString()}
                  </p>
                </div>
              )}
              
              {movie.revenue && movie.revenue > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Сборы</h4>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              )}

              {movie.status && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Статус</h4>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{movie.status}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Рейтинг</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {movie.vote_count.toLocaleString()} голосов
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieDetailModal);