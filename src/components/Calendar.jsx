import React, {useState} from "react";
// import { useEventContext } from "../context/EventContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import useEventContext from '../hooks/useEventContext'; // Update import

function Calendar() {
  //   const { events } = useEventContext();
  const currentMonth = dayjs().month();
  const daysInMonth = dayjs().daysInMonth();
  const startOfMonth = dayjs().startOf("month").day();
  const { events, deleteEvent } = useEventContext();
  const [editEvent, setEditEvent] = useState(null);

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(
        (event) =>
          dayjs(event.date).date() === day &&
          dayjs(event.date).month() === currentMonth
      );
      days.push(
        <div
          key={day}
          className="calendar-day p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <div className="date text-lg font-semibold">{day}</div>
          {dayEvents.map((event) => (
            <Link
              key={event.id}
              to={`/event/${event.id}`}
              className="event block mt-2 text-blue-500 dark:text-blue-300 hover:underline"
            >
              {event.title}
            </Link>
          ))}
        </div>
      );
    }
    return days;
  };

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
  };

  return (
    <div className="calendar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderDays()}
      {events.map((event) => (
        <div
          key={event.id}
          className="calendar-day p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm relative"
        >
          <div className="date text-lg font-semibold">
            {dayjs(event.date).date()}
          </div>
          <div className="event mt-2">
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
        </div>
      ))}
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
