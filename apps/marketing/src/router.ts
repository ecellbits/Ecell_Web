import "./ssr-globals";
import { createRouter } from "@tanstack/react-router";
import RoutePending from "./components/common/RoutePending";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    // A false predicate also disables TanStack's automatic onRendered top reset.
    // Reset once at navigation start instead, before the user can start scrolling.
    scrollRestoration: () => false,
    defaultPendingComponent: RoutePending,
    defaultPendingMs: 0,
    defaultPendingMinMs: 0,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
