import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Calendar } from "lucide-react";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data?.map((movie: IMovie) => (
              <div
                  key={movie.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                  onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img

                      src={IMAGE_URL + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />




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
          ))}
        </div>
      </div>
  );
};

export default React.memo(MovieView);