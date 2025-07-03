import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';
import MovieDetailModal from '@/components/movie-detail-modal/MovieDetailModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  data: IMovie[] | undefined;
  title: string;
  subtitle?: string;
}

const MovieCarousel: React.FC<Props> = ({ data, title, subtitle }) => {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (!data || data.length === 0) {
    return null;
  }

  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <button className={`${sectionId}-prev w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-200`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className={`${sectionId}-next w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-200`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Movies Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${sectionId}-next`,
            prevEl: `.${sectionId}-prev`,
          }}
          pagination={{
            clickable: true,
            bulletClass: `${sectionId}-pagination-bullet`,
            bulletActiveClass: `${sectionId}-pagination-bullet-active`,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className={`${sectionId}-swiper`}
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleMovieClick(movie)}
              >
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                      <p className="text-sm font-medium">Подробнее</p>
                    </div>
                  </div>

                  {/* Release Year Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {movie.release_date.split("-")[0]}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-5">
                  <h3
                    title={movie.title}
                    className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200"
                  >
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(movie.vote_average / 2)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Pagination */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className={`${sectionId}-pagination flex space-x-2`}></div>
        </div>
      </div>

      {/* Movie Detail Modal */}
      <MovieDetailModal 
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default React.memo(MovieCarousel);