import React from 'react';
import { useMovie } from '@/api/hooks/useMovie';
import HeroCarousel from '@/components/hero-carousel/HeroCarousel';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Star, Calendar, TrendingUp } from 'lucide-react';

const Home = () => {
  const { getMovies } = useMovie();
  
  // Fetch hero carousel data
  const { data: heroData, isPending: heroPending } = getMovies({
    page: 1,
    sort_by: 'popularity.desc',
    without_genres: '18,36,27,10749',
  });

  if (heroPending) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Загружаем фильмы...</p>
        </div>
      </div>
    );
  }

  const categories = [
    {
      title: "Популярные фильмы",
      description: "Самые популярные фильмы на данный момент",
      icon: TrendingUp,
      link: "/popular",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Лучшие по рейтингу",
      description: "Фильмы с самыми высокими оценками",
      icon: Star,
      link: "/top-rated",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Скоро в кинотеатрах",
      description: "Новые фильмы, которые скоро выйдут",
      icon: Calendar,
      link: "/upcoming",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Боевики",
      description: "Захватывающие экшн-фильмы",
      icon: Film,
      link: "/action",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Комедии",
      description: "Лучшие комедийные фильмы",
      icon: Film,
      link: "/comedy",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Драмы",
      description: "Глубокие и эмоциональные истории",
      icon: Film,
      link: "/drama",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Научная фантастика",
      description: "Фильмы о будущем и технологиях",
      icon: Film,
      link: "/sci-fi",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Все фильмы",
      description: "Полный каталог фильмов с фильтрами",
      icon: Film,
      link: "/movies",
      color: "from-gray-500 to-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Carousel Section */}
      <section id="hero" className="relative">
        <HeroCarousel data={heroData?.results?.slice(0, 5)} />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Исследуйте мир кино
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Откройте для себя тысячи фильмов разных жанров. От популярных блокбастеров до скрытых жемчужин кинематографа.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={category.link}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors duration-200">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-red-500 font-medium group-hover:text-red-600 transition-colors duration-200">
                      <span className="mr-2">Смотреть</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Мы предоставляем лучший опыт просмотра фильмов с удобным интерфейсом и богатой базой данных.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Film className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Огромная база фильмов</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Тысячи фильмов всех жанров и эпох. От классики до новинок кинематографа.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Высокое качество</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Только лучшие фильмы с высокими рейтингами и положительными отзывами зрителей.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Актуальные тренды</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Всегда в курсе последних трендов и новинок мирового кинематографа.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <Link 
              to="/movies"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Начать просмотр
            </Link>
            <Link 
              to="/popular"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Популярные фильмы
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);