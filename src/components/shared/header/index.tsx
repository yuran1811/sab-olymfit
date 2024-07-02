import { $, component$, useSignal } from "@builder.io/qwik";

import NavLink, { NavLinkMobile } from "~/components/shared/nav-link";
import ThemeToggle from "~/components/shared/theme-toggle";

import { classnames } from "~/utils";

const beforeStyle = (active: boolean) =>
  `before:transition-all before:content-[""] before:absolute before:bg-white before:w-full before:h-[0.5rem] before:top-[1.2rem] before:rounded-md before:left-0 ${
    active ? "before:rotate-[135deg] before:top-[2rem]" : "before:!bg-white"
  }`;

const afterStyle = (active: boolean) =>
  `after:transition-all after:content-[""] after:absolute after:bg-white after:w-full after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 after:rounded-md ${
    active ? "after:rotate-[-135deg] after:top-[2rem]" : "after:!bg-white"
  }`;

export default component$((props: { pathname?: string }) => {
  const showMenu = useSignal(false);

  const handleChange$ = $(() => (showMenu.value = !showMenu.value));

  return (
    <header class="sticky left-0 right-0 top-0 bg-gray-800 p-4 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
      <div class="container mx-auto flex h-14 justify-between">
        <div class="flex">
          <NavLink pathname={props.pathname} />
        </div>

        <div class="flex flex-shrink-0 items-center gap-6">
          <ThemeToggle />
        </div>

        <button
          class={classnames(
            "relative flex h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] scale-50 cursor-pointer items-center justify-center p-4 transition-all sm:hidden",
            beforeStyle(showMenu.value),
            afterStyle(showMenu.value),
          )}
          onClick$={() => (showMenu.value = !showMenu.value)}
        />
      </div>

      {showMenu.value && (
        <div class="fixed left-0 right-0 top-[88px] z-50 w-screen bg-gray-800 pb-12">
          <NavLinkMobile
            pathname={props.pathname}
            handleChange$={handleChange$}
          />
        </div>
      )}
    </header>
  );
});
