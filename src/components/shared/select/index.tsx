import { component$ } from "@builder.io/qwik";
import { Select } from "@qwik-ui/headless";

export default component$(({ list }: { list: string[] }) => (
  <Select.Root class="form-select">
    <Select.Label>Select the sport</Select.Label>
    <Select.Trigger class="select-trigger">
      <Select.DisplayValue placeholder="Select an option" />
    </Select.Trigger>
    <Select.Popover class="select-popover">
      <Select.Listbox class="select-listbox">
        {list.map((item) => (
          <Select.Item class="select-item" key={item}>
            <Select.ItemLabel>{item}</Select.ItemLabel>
            <Select.ItemIndicator>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                />
              </svg>
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Listbox>
    </Select.Popover>
  </Select.Root>
));
