import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const MovieDetail = lazy(() => import("./movies/MovieDetail"));
const Popular = lazy(() => import("./popular/Popular"));
const TopRated = lazy(() => import("./top-rated/TopRated"));
const Upcoming = lazy(() => import("./upcoming/Upcoming"));
const Action = lazy(() => import("./action/Action"));
const Comedy = lazy(() => import("./comedy/Comedy"));
const Drama = lazy(() => import("./drama/Drama"));
const SciFi = lazy(() => import("./sci-fi/SciFi"));

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/popular",
          element: <Popular />,
        },
        {
          path: "/top-rated",
          element: <TopRated />,
        },
        {
          path: "/upcoming",
          element: <Upcoming />,
        },
        {
          path: "/action",
          element: <Action />,
        },
        {
          path: "/comedy",
          element: <Comedy />,
        },
        {
          path: "/drama",
          element: <Drama />,
        },
        {
          path: "/sci-fi",
          element: <SciFi />,
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);
};

export default MainRouter;