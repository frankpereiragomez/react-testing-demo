import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

const wrapWithRouter = (routes: RouteObject[], initialEntries = ["/"]) => {
  const router = createMemoryRouter(routes, { initialEntries });

  return { router, element: <RouterProvider router={router} /> };
};

export default wrapWithRouter;
