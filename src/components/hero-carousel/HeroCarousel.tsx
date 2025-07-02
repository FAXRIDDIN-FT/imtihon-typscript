import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Props {
  data: IMovie[] | undefined;
}

const HeroCarousel: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        className="h-full"
      >
        {data.slice(0, 5).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`,
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
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
                        <span>2h 15m</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        <span>Смотреть трейлер</span>
                      </button>
                      
                      <button
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-white/30 hover:border-white/50"
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
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {data.slice(0, 5).map((_, index) => (
          <div
            key={index}
            className="swiper-pagination-bullet-custom w-3 h-3 bg-white/40 rounded-full cursor-pointer transition-all duration-200 hover:bg-white/60"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(HeroCarousel);