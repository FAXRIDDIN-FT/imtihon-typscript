import { useMovie } from '@/api/hooks/useMovie';
import React from 'react';
import HeroCarousel from '@/components/hero-carousel/HeroCarousel';
import MovieCarousel from '@/components/movie-carousel/MovieCarousel';

const Home = () => {
  const { getMovies } = useMovie();
  
  // Get different sets of movies for different sections
  const { data: heroMovies } = getMovies({ 
    page: 1, 
    without_genres: "18,36,27,10749",
    sort_by: "popularity.desc"
  });
  
  const { data: popularMovies } = getMovies({ 
    page: 1, 
    without_genres: "18,36,27,10749",
    sort_by: "vote_average.desc",
    "vote_count.gte": 1000
  });
  
  const { data: recentMovies } = getMovies({ 
    page: 1, 
    without_genres: "18,36,27,10749",
    sort_by: "release_date.desc",
    "primary_release_date.gte": "2024-01-01"
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Carousel */}
      <HeroCarousel data={heroMovies?.results} />
      
      {/* Popular Movies Section */}
      <MovieCarousel 
        data={popularMovies?.results?.slice(0, 10)} 
        title="Популярные фильмы"
        subtitle="Самые высоко оцененные фильмы этого года"
      />
      
      {/* Recent Movies Section */}
      <MovieCarousel 
        data={recentMovies?.results?.slice(0, 10)} 
        title="Новинки кино"
        subtitle="Последние премьеры и новые релизы"
      />
      
      {/* Trending Movies Section */}
      <MovieCarousel 
        data={heroMovies?.results?.slice(8, 18)} 
        title="В тренде"
        subtitle="Самые обсуждаемые фильмы сейчас"
      />
    </div>
  );
};

export default React.memo(Home);