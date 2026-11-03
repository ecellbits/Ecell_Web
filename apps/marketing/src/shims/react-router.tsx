/**
 * Shim layer: react-router-dom API mapped onto TanStack Router.
 * The app was migrated from react-router; all existing imports keep working.
 */
import {
  useLocation as useRouterLocation,
  useRouter,
  Link as TanStackLink,
} from "@tanstack/react-router";
import { useMemo, type ComponentPropsWithoutRef } from "react";

export { TanStackLink };

type RouterLocation = {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
};

export function useLocation(): RouterLocation {
  const loc = useRouterLocation();
  return useMemo(() => ({
    pathname: loc.pathname,
    search: loc.searchStr,
    hash: loc.hash,
    state: loc.state,
    key: loc.state.__TSR_key ?? loc.pathname,
  }), [loc]);
}

export type NavigateOptions = {
  state?: unknown;
  replace?: boolean;
  preventScrollReset?: boolean;
};

export function useNavigate() {
  const router = useRouter();
  return function navigate(to: string | number, options?: NavigateOptions) {
    if (typeof to === "number") {
      if (to < 0) router.history.back();
      else if (to > 0) router.history.forward();
      else router.history.push(String(to));
      return;
    }
    return router.navigate({
      href: to,
      state: options?.state as never,
      replace: options?.replace,
      resetScroll: !options?.preventScrollReset,
    });
  };
}

export type LinkProps = ComponentPropsWithoutRef<"a"> & {
  to?: string;
  replace?: boolean;
  state?: unknown;
};

export function Link({ to, children, replace, ...props }: LinkProps) {
  if (to === undefined) {
    return (
      <a {...props} href={props.href}>
        {children}
      </a>
    );
  }
  return (
    <TanStackLink to={to} replace={replace} {...(props as never)}>
      {children}
    </TanStackLink>
  );
}

export type NavLinkProps = LinkProps & {
  end?: boolean;
};

export function NavLink({ to, end = false, className, children, ...props }: NavLinkProps) {
  const loc = useLocation();
  const isActive = end || to === "/"
    ? loc.pathname === to
    : loc.pathname === to || loc.pathname.startsWith(to + "/");
  const resolvedClass =
    typeof className === "function" ? className({ isActive, isPending: false, isTransitioning: false }) : className;
  if (to === undefined) {
    return (
      <a {...props} className={resolvedClass} href={props.href}>
        {children}
      </a>
    );
  }
  return (
    <TanStackLink
      to={to}
      className={resolvedClass}
      activeOptions={{ exact: end || to === "/", includeSearch: false }}
      {...(props as never)}
    >
      {children}
    </TanStackLink>
  );
}

export type UseSearchParamsReturn = [
  URLSearchParams,
  (next: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams), options?: NavigateOptions) => void,
];

export function useSearchParams(): UseSearchParamsReturn {
  const loc = useRouterLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(loc.search ?? "");
  const setSearchParams = (next: unknown, options?: NavigateOptions) => {
    const updated =
      typeof next === "function" ? (next as (prev: URLSearchParams) => URLSearchParams)(searchParams) : (next as URLSearchParams);
    const qs = updated.toString();
    navigate(qs.length > 0 ? `?${qs}` : "?", options);
  };
  return [searchParams, setSearchParams];
}
