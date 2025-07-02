import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import { useParamsHook } from "@/hooks/useParamsHook";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();
  const { getParam, setParam } = useParamsHook();

  const genre = getParam("genre");

  const page = Number(getParam("page")) || 1;

  const handlePagination = (value: number) => {
    setParam("page", value.toString());
  };

  const { data: genreData } = getGenres();
  const { data, isPending, error, isError } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
    // "release_date.gte": "01-01-1800",
    // "release_date.lte": "01-01-1890",
  });

  return (
    <div>
      <Genre data={genreData?.genres} />
      <MovieView data={data?.results} />
      <div>
        <Pagination
          current={page}
          onChange={handlePagination}
          pageSize={20}
          total={data?.total_results <= 10_000 ? data?.total_results : 10_000}
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
