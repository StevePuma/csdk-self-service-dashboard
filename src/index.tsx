import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SisenseContextProvider } from "@sisense/sdk-ui";

const sisenseContextProviderArgs = {
  url: "https://your-sisense-server.com",
  token: "token",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SisenseContextProvider {...sisenseContextProviderArgs}>
      <App />
    </SisenseContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
