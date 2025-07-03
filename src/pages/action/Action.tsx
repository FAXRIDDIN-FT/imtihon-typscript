import React from 'react';
import { useMovie } from '@/api/hooks/useMovie';
import MovieView from '@/components/movie-view/MovieView';
import { useParamsHook } from '@/hooks/useParamsHook';
import { ChevronLeft, ChevronRight, Zap, Loader2 } from 'lucide-react';

const Action = () => {
  const { getMovies } = useMovie();
  const { getParam, setParam } = useParamsHook();

  const page = Number(getParam("page")) || 1;

  const handlePagination = (value: number) => {
    setParam("page", value.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, isPending, isError } = getMovies({
    page,
    with_genres: '28',
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  const totalPages = Math.min(Math.ceil((data?.total_results || 0) / 20), 500);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    const adjustedStart = Math.max(1, end - maxVisiblePages + 1);

    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Что-то пошло не так</h2>
          <p className="text-gray-600 dark:text-gray-400">Не удалось загрузить боевики. Попробуйте позже.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-white mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Боевики
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Захватывающие экшн-фильмы с невероятными трюками и спецэффектами
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isPending && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем боевики...</p>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {!isPending && data?.results && (
          <>
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="text-sm">
                  Показано {((page - 1) * 20) + 1}-{Math.min(page * 20, data.total_results)} из {data.total_results.toLocaleString()} фильмов
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Страница {page} из {totalPages}
              </div>
            </div>

            <MovieView data={data.results} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePagination(page - 1)}
                      disabled={page === 1}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Назад
                    </button>

                    {/* First Page */}
                    {getVisiblePages()[0] > 1 && (
                      <>
                        <button
                          onClick={() => handlePagination(1)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          1
                        </button>
                        {getVisiblePages()[0] > 2 && (
                          <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
                        )}
                      </>
                    )}

                    {/* Visible Pages */}
                    {getVisiblePages().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePagination(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          pageNum === page
                            ? "bg-orange-500 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Last Page */}
                    {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
                      <>
                        {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
                          <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePagination(totalPages)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePagination(page + 1)}
                      disabled={page === totalPages}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Вперед
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                  {/* Page Jump */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Перейти на страницу:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={page}
                      onChange={(e) => {
                        const newPage = parseInt(e.target.value);
                        if (newPage >= 1 && newPage <= totalPages) {
                          handlePagination(newPage);
                        }
                      }}
                      className="w-20 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">из {totalPages}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isPending && data?.results?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Фильмы не найдены</h2>
            <p className="text-gray-600 dark:text-gray-400">Попробуйте обновить страницу</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Action);