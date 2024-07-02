import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";

import Select from "~/components/shared/select";

import { SPORT_LIST } from "~/constants";
import { getHeadInfo } from "~/utils";

export default component$(() => {
  return (
    <>
      <Form>
        <label class="input input-bordered flex items-center gap-2">
          Name
          <input type="text" class="form-input" placeholder="Daisy" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          Email
          <input type="text" class="form-input" placeholder="daisy@site.com" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="form-input" placeholder="Search" />
          <kbd class="kbd kbd-sm">⌘</kbd>
          <kbd class="kbd kbd-sm">K</kbd>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="form-input" placeholder="Search" />
          <span class="badge badge-info">Optional</span>
        </label>
        <label class="form-control w-full max-w-xs">
          <Select list={SPORT_LIST} />
        </label>
      </Form>
    </>
  );
});

export const head: DocumentHead = getHeadInfo("Payment");
