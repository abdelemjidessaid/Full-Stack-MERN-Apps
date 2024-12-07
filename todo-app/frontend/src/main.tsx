import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContext } from "./context/AppProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContext>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppContext>
  </StrictMode>
);
