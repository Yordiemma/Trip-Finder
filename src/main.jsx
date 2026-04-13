// REVIEW: StrictMode double-invokes effects in development; weather fetch runs twice locally (abort cleans up — OK, but noisy in DevTools).
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
