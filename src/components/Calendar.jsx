import React, { useState } from "react";
import useEventContext from "../hooks/useEventContext";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";

function Calendar() {
  const { events, deleteEvent } = useEventContext();
  const [editEvent, setEditEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure to delete the event?")) {
      deleteEvent(eventId);
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar grid grid-cols-7 gap-2">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={index}></div>
          ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getDate() === day &&
              eventDate.getMonth() === currentDate.getMonth() &&
              eventDate.getFullYear() === currentDate.getFullYear()
            );
          });

          return (
            <div
              key={day}
              className="calendar-day p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm relative"
            >
              <div className="date text-lg font-semibold">{day}</div>
              {dayEvents.map((event) => (
                <div key={event.id} className="event mt-2">
                  <Link
                    to={`/event/${event.id}`}
                    className="text-blue-500 dark:text-blue-300 hover:underline"
                  >
                    {event.title}
                  </Link>
                  <button
                    onClick={() => setEditEvent(event)}
                    className="absolute top-2 right-12 text-blue-500 dark:text-blue-300 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="absolute top-2 right-2 text-red-500 dark:text-red-300 hover:underline"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {editEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <EventForm
            eventToEdit={editEvent}
            onClose={() => setEditEvent(null)}
          />
        </div>
      )}
    </div>
  );
}

export default Calendar;
