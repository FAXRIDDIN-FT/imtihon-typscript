import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import { useMovie } from '@/api/hooks/useMovie';
import MovieView from '@/components/movie-view/MovieView';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';
import type { Swiper as SwiperType } from 'swiper';

const Home = () => {
  const { getMovies } = useMovie();
  const { data, isPending, isError } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
  });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (isPending) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем фильмы...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ошибка загрузки</h2>
        <p className="text-gray-600 dark:text-gray-400">Не удалось загрузить фильмы</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Swiper Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[1360px] w-full mx-auto">
          {/* Main Swiper */}
          <div className="h-[400px] md:h-[500px] lg:h-[640px] mb-4 rounded-xl overflow-hidden shadow-2xl">
            <Swiper
              style={{ 
                borderRadius: '12px',
                height: '100%'
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 h-full"
            >
              {data?.results?.map((movie: IMovie) => (
                <SwiperSlide key={movie.id}>
                  <div className="relative h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={IMAGE_URL + movie.backdrop_path}
                      alt={movie.title || 'Movie poster'}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Movie Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                      <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                          {movie.title}
                        </h2>
                        
                        <div className="flex items-center space-x-4 mb-4 text-white/90">
                          <div className="flex items-center space-x-1">
                            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span>Смотреть трейлер</span>
                          </button>
                          
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/30">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails Swiper */}
          <div className="h-20 md:h-24 lg:h-32">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              breakpoints={{
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 6,
                },
                1280: {
                  slidesPerView: 7,
                },
              }}
              className="mySwiper thumbs-swiper h-full"
            >
              {data?.results?.map((movie: IMovie) => (
                <SwiperSlide key={movie.id + '_thumb'}>
                  <div className="relative h-full group cursor-pointer">
                    <img
                      className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                      src={IMAGE_URL + movie.poster_path}
                      alt={movie.title || 'Movie poster'}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg"></div>
                    
                    {/* Movie Title on Hover */}
                    <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-medium truncate bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Популярные фильмы
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Откройте для себя самые популярные фильмы
          </p>
        </div>
        
        <MovieView data={data?.results?.slice(0, 8) || []} />
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105">
            Посмотреть все фильмы
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);