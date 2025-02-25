import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import iconUrl from "./assets/iconTodo.png";

const favicon = document.getElementById("favicon");
if (favicon) {
  favicon.href = iconUrl;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
