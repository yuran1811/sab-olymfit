import { component$ } from "@builder.io/qwik";

import { classnames } from "~/utils";

export default component$(
  ({ type, imgClass }: { type: "full" | "circle"; imgClass?: string }) => (
    <>
      <img
        class={classnames(
          imgClass || "",
          "dark:border-sab-color-3-dark rounded-full border-2 border-transparent",
        )}
        src={
          "/logos/" +
          (type === "circle" ? "simple-circle-trans-200x200" : "full-trans") +
          ".png"
        }
        alt="sab logo"
        width={type === "circle" ? 50 : 120}
        height={50}
      />
    </>
  ),
);
