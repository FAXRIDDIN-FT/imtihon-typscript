export interface IMovie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
  tagline?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  genres?: IGenre[];
  production_countries?: IProductionCountry[];
  spoken_languages?: ISpokenLanguage[];
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface ICrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface ICredits {
  cast: ICast[];
  crew: ICrew[];
}

export interface IImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export interface IImages {
  backdrops: IImage[];
  posters: IImage[];
}

export interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGenreResponse {
  genres: IGenre[];
}