import { $, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import SabLogo from "../sab-logo";

import { PUBLIC_ROUTES } from "~/constants";
import { checkPathInclude, classnames } from "~/utils";

const beforeStyle = (active: boolean) =>
  `before:transition-all before:content-[""] before:absolute before:bg-white dark:before:bg-slate-400 before:w-full before:h-[0.5rem] before:top-[1.2rem] before:rounded-md before:left-0 ${
    active ? "before:rotate-[135deg] before:top-[2rem]" : ""
  }`;

const afterStyle = (active: boolean) =>
  `after:transition-all after:content-[""] after:absolute after:bg-white dark:after:bg-slate-400 after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 after:rounded-md after:w-full ${
    active ? "after:rotate-[-135deg] after:top-[2rem]" : ""
  }`;

export const NavLinkMobile = component$((props: { pathname?: string }) => {
  const extractedPath = props.pathname || "";

  const showMenu = useSignal(false);

  const handleChange$ = $(() => (showMenu.value = !showMenu.value));

  return (
    <>
      <button
        class={classnames(
          "relative flex h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] scale-50 cursor-pointer items-center justify-center p-4 transition-all sm:hidden",
          beforeStyle(showMenu.value),
          afterStyle(showMenu.value),
        )}
        onClick$={() => (showMenu.value = !showMenu.value)}
      />
      {showMenu.value && (
        <div class="bg-text-primary fixed left-0 right-0 top-[88px] z-50 w-screen pb-12 sm:hidden">
          <ul
            class={classnames(
              "flex flex-col items-center justify-start gap-4 text-xl sm:hidden",
            )}
          >
            {PUBLIC_ROUTES.map((_) => (
              <li
                class="flex"
                key={`${_.path}--${_.name}`}
                onClick$={handleChange$}
              >
                <Link
                  href={_.path}
                  class={classnames(
                    "dark:border- -mb-1 flex h-12 items-center px-4 font-medium",
                    checkPathInclude(extractedPath, _.path) &&
                      "border-sab-color-2 text-sab-color-2 dark:border-sab-color-3-dark dark:text-sab-color-3-dark",
                  )}
                >
                  {_.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
});

export default component$((props: { pathname?: string; class?: string }) => {
  const extractedPath = props.pathname || "";

  return (
    <ul class={classnames(props.class || "", "items-stretch space-x-3")}>
      <li class="flex">
        <Link
          href="/"
          class="dark:border- -mb-1 flex items-center px-4 font-medium"
        >
          <SabLogo type="circle" />
        </Link>
      </li>

      {PUBLIC_ROUTES.map((_) => (
        <li class="flex" key={`${_.path}--${_.name}`}>
          <Link
            href={_.path}
            class={classnames(
              "dark:border- -mb-1 flex items-center overflow-hidden text-ellipsis border-b-2 px-4 font-medium",
              checkPathInclude(extractedPath, _.path) &&
                "border-sab-color-2 text-sab-color-2 dark:border-sab-color-3-dark dark:text-sab-color-3-dark",
            )}
          >
            {_.name}
          </Link>
        </li>
      ))}
    </ul>
  );
});
