import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

import { getHeadInfo } from "~/utils";

export default component$(() => {
  return (
    <div class="flexcentercol h-[calc(100vh-88px)]">
      <img class="mx-auto w-full max-w-3xl" src="/imgs/register-banner.png" />

      <Link href="/payment">
        <div class="style-btn mx-auto mt-4">Đăng kí ngay</div>
      </Link>
    </div>
  );
});

export const head: DocumentHead = getHeadInfo("Home");
