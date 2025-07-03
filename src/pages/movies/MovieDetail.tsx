import React from 'react';
import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useParams, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { Star, Calendar, Clock, ArrowLeft, Play, Heart, Share2 } from "lucide-react";
import MovieView from "@/components/movie-view/MovieView";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieSingle, getMovieDetail } = useMovie();

  const { data, isPending, isError } = getMovieSingle(id || "");
  const { data: similarData } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем информацию о фильме...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Фильм не найден</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Не удалось загрузить информацию о фильме</p>
          <button
            onClick={() => navigate('/movies')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Вернуться к фильмам
          </button>
        </div>
      </div>
    );
  }

  const formatBudget = (budget: number) => {
    if (budget >= 1000000) {
      return `$${(budget / 1000000).toFixed(1)}M`;
    }
    return `$${budget.toLocaleString()}`;
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${IMAGE_URL}${data.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Movie Info */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <img
                  src={IMAGE_URL + data.poster_path}
                  alt={data.title}
                  className="w-48 md:w-64 rounded-xl shadow-2xl"
                />
              </div>

              {/* Movie Details */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {data.title}
                </h1>

                {data.tagline && (
                  <p className="text-xl text-white/80 mb-6 italic">
                    "{data.tagline}"
                  </p>
                )}

                {/* Movie Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold">{data.vote_average.toFixed(1)}</span>
                    <span className="text-sm">({data.vote_count.toLocaleString()} голосов)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(data.release_date).getFullYear()}</span>
                  </div>

                  {data.runtime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{formatRuntime(data.runtime)}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {data.genres && data.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.genres.map((genre: any) => (
                      <span
                        key={genre.id}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Смотреть трейлер</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/30">
                    <Heart className="w-5 h-5" />
                    <span>В избранное</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/30">
                    <Share2 className="w-5 h-5" />
                    <span>Поделиться</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview */}
        {data.overview && (
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Описание</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {data.overview}
              </p>
            </div>
          </section>
        )}

        {/* Movie Details */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Детали фильма</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.budget > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Бюджет</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatBudget(data.budget)}</p>
                </div>
              )}
              
              {data.revenue > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Сборы</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatBudget(data.revenue)}</p>
                </div>
              )}

              {data.production_countries && data.production_countries.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Страна</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {data.production_countries.map((country: any) => country.name).join(', ')}
                  </p>
                </div>
              )}

              {data.spoken_languages && data.spoken_languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Язык</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {data.spoken_languages.map((lang: any) => lang.english_name).join(', ')}
                  </p>
                </div>
              )}

              {data.status && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Статус</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{data.status}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cast */}
        {creditsData?.cast && creditsData.cast.length > 0 && (
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">В ролях</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {creditsData.cast.slice(0, 12).map((person: any) => (
                  <div key={person.id} className="text-center">
                    <div className="relative mb-3">
                      <img
                        src={person.profile_path ? IMAGE_URL + person.profile_path : '/placeholder-person.jpg'}
                        alt={person.name}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150x200/e5e7eb/6b7280?text=No+Photo';
                        }}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {person.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {person.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Images Gallery */}
        {imagesData?.backdrops && imagesData.backdrops.length > 0 && (
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Кадры из фильма</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Image.PreviewGroup>
                  {imagesData.backdrops.slice(0, 12).map((image: any, index: number) => (
                    <Image
                      key={index}
                      src={IMAGE_URL + image.file_path}
                      alt={`Кадр ${index + 1}`}
                      className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarData?.results && similarData.results.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Похожие фильмы</h2>
              <p className="text-gray-600 dark:text-gray-400">Фильмы, которые могут вам понравиться</p>
            </div>
            <MovieView data={similarData.results.slice(0, 8)} />
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(MovieDetail);