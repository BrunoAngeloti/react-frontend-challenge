import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { MovieDetailsPage } from "@/pages/movie-details";
import { NotFoundPage } from "@/pages/not-found";
import { WatchlistPage } from "@/pages/watchlist";
import { ProtectedLayout } from "@/widgets/app-shell/protected-layout";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/watchlist",
  component: WatchlistPage,
});

const movieRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/movie/$id",
  component: MovieDetailsPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([dashboardRoute, watchlistRoute, movieRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}