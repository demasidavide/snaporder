import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DetailsProvider } from "./context/delayContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DetailsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DetailsProvider>
  </StrictMode>,
);
