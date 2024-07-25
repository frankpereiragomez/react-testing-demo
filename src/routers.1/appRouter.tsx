import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import paths from "./paths/paths";
import App from "../components/App/App";
import PokemonList from "../components/PokemonList/PokemonList";
import PokemonDetails from "../pages/PokemonDetailsPage/PokemonDetails";

const routes: RouteObject[] = [
  {
    path: paths.app,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={paths.home} replace />,
      },
      {
        path: paths.home,
        element: <PokemonList />,
      },
      {
        path: paths.pokemonDetails,
        element: <PokemonDetails />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
