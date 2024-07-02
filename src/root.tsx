import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

import "./global.css";

import { RouterHead } from "~/components/router-head/router-head";

export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charset="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <RouterHead />
      <ServiceWorkerRegister />
    </head>
    <body lang="en">
      <RouterOutlet />
    </body>
  </QwikCityProvider>
));
