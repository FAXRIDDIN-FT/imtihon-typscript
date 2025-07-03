import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Star, Calendar, Clock, ChevronLeft, ChevronRight, TrendingUp, Award, Film, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';

import { useMovie } from '@/api/hooks/useMovie';
import MovieView from '@/components/movie-view/MovieView';
import MovieCarousel from '@/components/movie-carousel/MovieCarousel';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';
import type { Swiper as SwiperType } from 'swiper';

const Home = () => {
  const navigate = useNavigate();
  const { getMovies } = useMovie();
  
  // Get different sets of movies for different sections
  const { data: heroMovies, isPending: heroLoading } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
    sort_by: 'popularity.desc'
  });
  
  const { data: popularMovies } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 1000
  });
  
  const { data: recentMovies } = getMovies({
    page: 1,
    without_genres: '18,36,27,10749',
    sort_by: 'release_date.desc',
    'primary_release_date.gte': '2024-01-01'
  });

  const { data: trendingMovies } = getMovies({
    page: 2,
    without_genres: '18,36,27,10749',
    sort_by: 'popularity.desc'
  });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (heroLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем фильмы...</p>
        </div>
      </div>
    );
  }

  const movies = heroMovies?.results || [];

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
              loop={true}
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

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Фильмов</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">1M+</h3>
              <p className="text-gray-600 dark:text-gray-400">Пользователей</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Наград</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">99%</h3>
              <p className="text-gray-600 dark:text-gray-400">Рейтинг</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Movies Carousel */}
      <MovieCarousel 
        data={popularMovies?.results?.slice(0, 10)} 
        title="Популярные фильмы"
        subtitle="Самые высоко оцененные фильмы этого года"
      />

      {/* Recent Movies Carousel */}
      <MovieCarousel 
        data={recentMovies?.results?.slice(0, 10)} 
        title="Новинки кино"
        subtitle="Последние премьеры и новые релизы"
      />

      {/* Featured Movies Grid */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Рекомендуемые фильмы
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Специально отобранные фильмы, которые стоит посмотреть каждому любителю кино
            </p>
          </div>
          
          <MovieView data={movies.slice(0, 8)} />
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/movies')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
            >
              Посмотреть все фильмы
            </button>
          </div>
        </div>
      </section>

      {/* Trending Movies Carousel */}
      <MovieCarousel 
        data={trendingMovies?.results?.slice(0, 10)} 
        title="В тренде"
        subtitle="Самые обсуждаемые фильмы сейчас"
      />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Не пропустите новинки!
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Подпишитесь на нашу рассылку и первыми узнавайте о новых фильмах и специальных предложениях
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
              />
              <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
                Подписаться
              </button>
            </div>
            
            <p className="text-red-200 text-sm mt-4">
              Мы уважаем вашу конфиденциальность и не передаем данные третьим лицам
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-900 dark:bg-black transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Готовы окунуться в мир кино?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Откройте для себя тысячи фильмов, от классики до новинок. 
              Найдите свой следующий любимый фильм уже сегодня!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/movies')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
              >
                Начать просмотр
              </button>
              
              <button
                onClick={() => navigate('/search')}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
              >
                Найти фильм
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);