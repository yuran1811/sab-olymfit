import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { Toaster } from "qwik-sonner";

import Header from "~/components/shared/header";

import { usePathname } from "~/shared/loaders";
export { usePathname } from "~/shared/loaders";

export const onGet: RequestHandler = async ({ url, cacheControl }) => {
  // https://qwik.dev/docs/caching/
  cacheControl({
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });

  if (url.pathname === "/") {
    cacheControl({
      public: true,
      maxAge: 5,
      staleWhileRevalidate: 60 * 4,
    });
    cacheControl(
      {
        maxAge: 5,
        staleWhileRevalidate: 60 * 4,
      },
      "CDN-Cache-Control",
    );
  }
};

export default component$(() => {
  const pathname = usePathname().value;

  return (
    <>
      <Header pathname={pathname} />
      <main>
        <Slot />
      </main>
      <Toaster position="bottom-center" expand={false} richColors />
      {/* <Footer /> */}
    </>
  );
});
