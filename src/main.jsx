import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");
    return worker.start({
      onUnhandledRequest: "bypass"
    });
  }

  return Promise.resolve();
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

enableMocks()
  .catch((error) => {
    console.error("No se pudo iniciar MSW", error);
  })
  .finally(renderApp);
