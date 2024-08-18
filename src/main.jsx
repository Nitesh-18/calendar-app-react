import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import { EventProvider } from "./hooks/useEventContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>
);
