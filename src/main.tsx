import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/main.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pre-rendered routes ship markup in #root; the 404.html SPA fallback ships an empty shell.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
