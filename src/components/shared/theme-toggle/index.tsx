import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  type Signal,
} from "@builder.io/qwik";

export const ThemeContext = createContextId<Signal<string>>("theme-context");

export default component$(() => {
  const theme = useSignal("dark");
  useContextProvider(ThemeContext, theme);

  return (
    <>
      <button
        class="text-violet-400 dark:text-violet-600"
        onClick$={() => {
          theme.value = theme.value == "dark" ? "light" : "dark";
          document.body.classList.toggle("dark");
        }}
      >
        {theme.value == "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288"
            ></path>
          </svg>
        )}
      </button>
    </>
  );
});
