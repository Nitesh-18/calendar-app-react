import React from "react";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventFilter from "../components/EventFilter";

function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-primary">
        Calendar
      </h1>
      <EventFilter />
      <Calendar />
      <EventForm />
    </div>
  );
}

export default CalendarPage;
