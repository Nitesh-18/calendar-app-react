import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import { EventProvider } from "./context/EventContext";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <EventProvider>
      <Router>
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
