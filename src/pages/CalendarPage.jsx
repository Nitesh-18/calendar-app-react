import React from "react";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventFilter from "../components/EventFilter";

function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Calendar App
      </h1>
      <EventFilter />
      <EventForm />
      <Calendar />
    </div>
  );
}

export default CalendarPage;
