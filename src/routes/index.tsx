import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { getHeadInfo } from "~/utils";

export default component$(() => {
  return (
    <div class="max-h-[calc(100dvh-92px)] p-6">
      <div class="relative left-0 right-0 top-0 h-full w-full">
        <div class="absolute left-0 top-0 z-0 w-full">
          <img
            class="w-full object-contain"
            src="/imgs/register-banner.png"
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = getHeadInfo("Home");
