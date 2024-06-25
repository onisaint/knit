import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { initFirebase } from "./firebase/init.ts";
import Root from "./root.tsx";

import "./styles/main.css";
import "./styles/global.css";
import { ErrorBoundary } from "react-error-boundary";

initFirebase();

const root = createRoot(document.getElementById("__root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={<p>Ops! something went wrong. Refresh and try again</p>}
    >
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
