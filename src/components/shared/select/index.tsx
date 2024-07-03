import { component$, useSignal, type QRL, type Signal } from "@builder.io/qwik";
import { Combobox, type ResolvedOption } from "@qwik-ui/headless";

import { type SportEnum } from "~/constants";
import { classnames } from "~/utils";

export default component$(
  ({
    list,
    signalValue,
    handleSelect$,
  }: {
    list: SportEnum[];
    signalValue: Signal<number>;
    handleSelect$: QRL<(value: number) => void>;
  }) => {
    const isListboxOpen = useSignal(false);

    return (
      <Combobox.Root
        bind:isListboxOpen={isListboxOpen}
        options={list as any}
        class="space-y-4"
      >
        <Combobox.Label class="font-semibold">
          Sport (click on the item to continue)
        </Combobox.Label>
        <Combobox.Control class="relative">
          <Combobox.Input
            class="bg-sab-color-1 focus:ring-sab-color-2 flex w-full flex-1 rounded-md border border-gray-700 text-gray-100 focus:ring-inset dark:border-gray-300 dark:bg-gray-100 dark:text-gray-800 focus:dark:ring-violet-600 sm:text-sm"
            placeholder="Select the sport you want to attend"
            onInput$={() => (isListboxOpen.value = true)}
            onClick$={() => (isListboxOpen.value = true)}
          />

          <Combobox.Popover class="mt-2 w-full max-w-xs bg-transparent">
            <Combobox.Listbox
              class="rounded-md bg-violet-700 dark:bg-violet-500"
              optionRenderer$={(option: ResolvedOption, index: number) => {
                return (
                  <Combobox.Option
                    class={classnames(
                      "group flex cursor-pointer items-center rounded-md p-3 text-gray-50 hover:bg-violet-800 dark:hover:bg-violet-600",
                      index === signalValue.value &&
                        "bg-violet-900 dark:bg-violet-700",
                    )}
                    key={option.key}
                    resolved={option}
                    index={index}
                    onClick$={(e) => {
                      e.stopPropagation();
                      handleSelect$(index);
                    }}
                  >
                    <span
                      class={classnames(
                        index !== signalValue.value &&
                          "transition-all group-hover:ml-3",
                      )}
                    >
                      {option.label}
                    </span>
                  </Combobox.Option>
                );
              }}
            />
          </Combobox.Popover>
        </Combobox.Control>
      </Combobox.Root>
    );
  },
);
