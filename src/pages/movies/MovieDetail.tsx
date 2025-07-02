import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();

  const { data } = getMovieSingle(id || "");
  const { data: similarData } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  console.log(creditsData?.cast);

  return (
    <div>
      <div>
        <img src={IMAGE_URL + data?.backdrop_path} alt="" />
      </div>
      <div>
        <h1 className="text-2xl">{data?.title}</h1>
        {!!data?.budget && <p>{data?.budget?.toLocaleString()} USD</p>}
      </div>
      <div className="flex flex-wrap">
        {imagesData?.backdrops?.slice(0, 20)?.map((item: any, inx:number) => (
          <Image key={inx} width={120} src={IMAGE_URL + item.file_path} />
        ))}
      </div>
      <div className="flex gap-3 flex-wrap overflow-auto">
        {creditsData?.cast?.map((person: any) => (
            <div key={person?.id}>
                <img width={150} src={IMAGE_URL+person?.profile_path} alt="" />
                <h3>{person?.original_name}</h3>
                <p>{person?.character}</p>
            </div>
        ))}
      </div>
      <div>
        <MovieView data={similarData?.results?.slice(0,4)}/>
      </div>
    </div>
  );
};

export default MovieDetail;
