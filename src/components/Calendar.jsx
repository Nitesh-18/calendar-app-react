import React, { useState } from "react";
import useEventContext from "../hooks/useEventContext";
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
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-container p-4 relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl rounded-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
      <div className="calendar-header flex justify-between items-center mb-6 text-white">
        <button
          onClick={handlePrevMonth}
          className="text-lg font-bold transition-transform transform hover:scale-125"
        >
          &lt;
        </button>
        <h2 className="text-3xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-lg font-bold transition-transform transform hover:scale-125"
        >
          &gt;
        </button>
      </div>
      <div className="calendar grid grid-cols-7 gap-4 animate-fade-in">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="calendar-placeholder"></div>
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
              className="calendar-day p-4 bg-white bg-opacity-80 dark:bg-darkBg border border-gradient-to-br from-purple-300 to-pink-300 shadow-lg rounded-lg transform hover:scale-110 transition-all duration-500 relative"
            >
              <div className="date text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {day}
              </div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="event p-2 mt-2 bg-blue-200 dark:bg-blue-900 text-xs md:text-sm truncate rounded-md shadow-inner transition-transform transform hover:scale-105 hover:bg-blue-300"
                >
                  <div className="event-title font-medium text-gray-800 dark:text-gray-200">
                    {event.title}
                  </div>
                  <div className="event-icons flex justify-end mt-1 space-x-2">
                    {/* <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      🗑️
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {editEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
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
