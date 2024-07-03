import { component$ } from "@builder.io/qwik";

import SabLogo from "../sab-logo";

export default component$((props: { year?: number }) => {
  return (
    <footer class="bg-text-primary px-6 py-8">
      <div class="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-row space-x-4 pr-3 sm:space-x-8">
          <div class="flex h-12 flex-shrink-0 items-center justify-center rounded-full">
            <SabLogo type="full" />
          </div>
          <ul class="flex flex-wrap items-center space-x-4 sm:space-x-8"></ul>
        </div>
        {props.year && (
          <div class="hidden md:block">
            <p class="text-center text-sm sm:text-base">Made by yuran1811</p>
            <p class="text-center text-sm sm:text-base">
              &copy; {props.year} - All rights reserved.
            </p>
          </div>
        )}
        <ul class="flex flex-wrap space-x-4 pl-3 sm:space-x-8">
          <li>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://fb.com/sab.ctda"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
});
