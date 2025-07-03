import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Star, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';

import { useMovie } from '@/api/hooks/useMovie';
import MovieView from '@/components/movie-view/MovieView';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';
import type { Swiper as SwiperType } from 'swiper';

const Home = () => {
  const navigate = useNavigate();
  const { getMovies } = useMovie();
  const { data, isPending, isError } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
    sort_by: 'popularity.desc'
  });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем фильмы...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 dark:text-gray-400">Не удалось загрузить фильмы. Попробуйте позже.</p>
        </div>
      </div>
    );
  }

  const movies = data?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Swiper Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-8">
          {/* Main Swiper */}
          <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl">
            <Swiper
              spaceBetween={0}
              navigation={{
                nextEl: '.hero-swiper-button-next',
                prevEl: '.hero-swiper-button-prev',
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              className="hero-swiper h-[400px] md:h-[500px] lg:h-[600px]"
            >
              {movies.slice(0, 10).map((movie: IMovie) => (
                <SwiperSlide key={movie.id}>
                  <div className="relative h-full">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path || movie.poster_path})`,
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                          {/* Movie Title */}
                          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            {movie.title}
                          </h1>

                          {/* Movie Info */}
                          <div className="flex flex-wrap items-center gap-4 mb-6 text-white/90">
                            <div className="flex items-center space-x-1">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-5 h-5" />
                              <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Clock className="w-5 h-5" />
                              <span>2ч 15м</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={() => navigate(`/movie/${movie.id}`)}
                              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
                            >
                              <Play className="w-5 h-5 fill-current" />
                              <span>Смотреть трейлер</span>
                            </button>
                            
                            <button
                              onClick={() => navigate(`/movie/${movie.id}`)}
                              className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/30 hover:border-white/50"
                            >
                              <span>Подробнее</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="hero-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button className="hero-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails Swiper */}
          <div className="relative">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
              className="thumbs-swiper"
            >
              {movies.slice(0, 10).map((movie: IMovie) => (
                <SwiperSlide key={`${movie.id}_thumb`}>
                  <div className="relative group cursor-pointer">
                    <img
                      className="w-full h-24 md:h-32 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                      src={IMAGE_URL + movie.poster_path}
                      alt={movie.title || 'Movie poster'}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white text-xs font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {movie.title}
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Movies Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Популярные фильмы
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Самые популярные фильмы этого месяца
            </p>
          </div>
          
          <MovieView data={movies.slice(0, 8)} />
          
          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/movies')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
            >
              Посмотреть все фильмы
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);