import { Slot, component$ } from "@builder.io/qwik";
import { Toaster } from "qwik-sonner";

import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";

import { usePathname } from "~/shared/loaders";
export { usePathname } from "~/shared/loaders";

export default component$(() => {
  const pathname = usePathname().value;

  return (
    <>
      <Header pathname={pathname} />
      <main>
        <Slot />
      </main>
      <Toaster position="bottom-center" expand={false} richColors />
      <Footer />
    </>
  );
});
