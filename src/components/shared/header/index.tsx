import { component$ } from "@builder.io/qwik";

import NavLink, { NavLinkMobile } from "~/components/shared/nav-link";
import ThemeToggle from "~/components/shared/theme-toggle";

export default component$((props: { pathname?: string }) => {
  return (
    <header class="sticky left-0 right-0 top-0 bg-gray-800 p-4 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
      <div class="container mx-auto flex h-14 justify-between">
        <div class="hidden sm:flex">
          <NavLink pathname={props.pathname} />
        </div>

        <div class="flex flex-shrink-0 items-center gap-6">
          <ThemeToggle />
        </div>

        <NavLinkMobile pathname={props.pathname} />
      </div>
    </header>
  );
});
