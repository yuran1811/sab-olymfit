import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { getHeadInfo } from "~/utils";

export default component$(() => {
  return (
    <>
      <div class="container mx-auto max-w-sm p-6 text-center text-2xl font-bold">
        Hello World
      </div>
    </>
  );
});

export const head: DocumentHead = getHeadInfo("Home");
