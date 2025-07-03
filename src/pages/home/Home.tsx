import React from 'react';
import { useMovie } from '@/api/hooks/useMovie';
import HeroCarousel from '@/components/hero-carousel/HeroCarousel';
import MovieCarousel from '@/components/movie-carousel/MovieCarousel';

const Home = () => {
  const { getMovies } = useMovie();
  
  // Fetch different categories of movies
  const { data: popularData, isPending: popularPending } = getMovies({
    page: 1,
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  const { data: topRatedData, isPending: topRatedPending } = getMovies({
    page: 1,
    sort_by: 'vote_average.desc',
    'vote_count.gte': 1000,
    without_genres: '18,36,27,10749',
  });

  const { data: upcomingData, isPending: upcomingPending } = getMovies({
    page: 1,
    sort_by: 'release_date.desc',
    'primary_release_date.gte': new Date().toISOString().split('T')[0],
    without_genres: '18,36,27,10749',
  });

  const { data: actionData, isPending: actionPending } = getMovies({
    page: 1,
    with_genres: '28',
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  const { data: comedyData, isPending: comedyPending } = getMovies({
    page: 1,
    with_genres: '35',
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  const { data: dramaData, isPending: dramaPending } = getMovies({
    page: 1,
    with_genres: '18',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 500,
  });

  const { data: sciFiData, isPending: sciFiPending } = getMovies({
    page: 1,
    with_genres: '878',
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  const isLoading = popularPending || topRatedPending || upcomingPending;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем фильмы...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Carousel Section */}
      <section id="hero" className="relative">
        <HeroCarousel data={popularData?.results?.slice(0, 5)} />
      </section>

      {/* Popular Movies Carousel */}
      <section id="popular">
        <MovieCarousel 
          data={popularData?.results} 
          title="Популярные фильмы"
          subtitle="Самые популярные фильмы на данный момент"
        />
      </section>

      {/* Top Rated Movies Carousel */}
      <section id="top-rated">
        <MovieCarousel 
          data={topRatedData?.results} 
          title="Лучшие по рейтингу"
          subtitle="Фильмы с самыми высокими оценками"
        />
      </section>

      {/* Upcoming Movies Carousel */}
      <section id="upcoming">
        <MovieCarousel 
          data={upcomingData?.results} 
          title="Скоро в кинотеатрах"
          subtitle="Новые фильмы, которые скоро выйдут"
        />
      </section>

      {/* Action Movies Carousel */}
      {!actionPending && actionData?.results && (
        <section id="action">
          <MovieCarousel 
            data={actionData.results} 
            title="Боевики"
            subtitle="Захватывающие экшн-фильмы"
          />
        </section>
      )}

      {/* Comedy Movies Carousel */}
      {!comedyPending && comedyData?.results && (
        <section id="comedy">
          <MovieCarousel 
            data={comedyData.results} 
            title="Комедии"
            subtitle="Лучшие комедийные фильмы"
          />
        </section>
      )}

      {/* Drama Movies Carousel */}
      {!dramaPending && dramaData?.results && (
        <section id="drama">
          <MovieCarousel 
            data={dramaData.results} 
            title="Драмы"
            subtitle="Глубокие и эмоциональные истории"
          />
        </section>
      )}

      {/* Sci-Fi Movies Carousel */}
      {!sciFiPending && sciFiData?.results && (
        <section id="sci-fi">
          <MovieCarousel 
            data={sciFiData.results} 
            title="Научная фантастика"
            subtitle="Фильмы о будущем и технологиях"
          />
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Откройте мир кино
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Тысячи фильмов, сериалов и документальных фильмов ждут вас. 
            Присоединяйтесь к миллионам зрителей по всему миру.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
              Начать просмотр
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-200">
              Узнать больше
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);