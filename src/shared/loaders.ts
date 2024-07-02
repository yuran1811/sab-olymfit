import { routeLoader$ } from "@builder.io/qwik-city";

export const useServerTime = routeLoader$(() => new Date());

export const usePathname = routeLoader$(({ pathname }) => pathname);
