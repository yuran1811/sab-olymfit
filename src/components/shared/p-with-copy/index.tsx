import { $, component$ } from "@builder.io/qwik";


import CopyIcon from "~/components/icons/copy-icon";

import { copyToClipboard } from "~/utils";

export default component$(
  ({
    content,
    style = "icon",
    pos = "right",
  }: {
    content: string;
    style?: "icon" | "button";
    pos?: "left" | "right" | "none";
  }) => {
    const copyAction$ = $(() => copyToClipboard(content));

    return (
      <div class="relative flex items-center gap-4">
        {pos === "left" && style === "button" && (
          <button class="style-btn scale-90" onClick$={copyAction$}>
            Copy
          </button>
        )}

        {pos === "left" && style === "icon" && (
          <button onClick$={copyAction$}>
            <CopyIcon class="scale-75" />
          </button>
        )}

        <span class="style-p">{content}</span>

        {pos === "right" && style === "button" && (
          <button class="style-btn scale-90" onClick$={copyAction$}>
            Copy
          </button>
        )}

        {pos === "right" && style === "icon" && (
          <button onClick$={copyAction$}>
            <CopyIcon class="scale-75" />
          </button>
        )}
      </div>
    );
  },
);
