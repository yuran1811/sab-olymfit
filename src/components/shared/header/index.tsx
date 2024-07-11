import { component$ } from "@builder.io/qwik";

import NavLink, { NavLinkMobile } from "~/components/shared/nav-link";
import ThemeToggle from "~/components/shared/theme-toggle";

export default component$(
  (props: { pathname?: string; minimized?: boolean }) => {
    return (
      <header class="bg-text-primary sticky left-0 right-0 top-0 z-50 p-4">
        <div class="container mx-auto flex h-14 items-center justify-between">
          <NavLink
            class={props.minimized ? "hidden sm:flex" : "flex"}
            pathname={props.pathname}
          />

          <div class="flex flex-shrink-0 items-center gap-6 pr-2">
            <ThemeToggle />
          </div>

          {!!props.minimized && <NavLinkMobile pathname={props.pathname} />}
        </div>
      </header>
    );
  },
);
