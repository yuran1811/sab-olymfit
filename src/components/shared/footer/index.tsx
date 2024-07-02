import { component$ } from "@builder.io/qwik";

export default component$((props: { year?: number }) => {
  return (
    <footer class="bg-gray-800 px-6 py-8 text-gray-400 dark:bg-gray-100 dark:text-gray-600">
      <div class="container mx-auto flex flex-wrap items-center justify-center gap-4 sm:justify-between">
        <div class="flex flex-row space-x-4 pr-3 sm:space-x-8">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-400 dark:bg-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              class="h-5 w-5 rounded-full text-gray-900 dark:text-gray-50"
            >
              <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
            </svg>
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
