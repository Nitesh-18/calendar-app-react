import React from "react";
import { useEventContext } from "../context/EventContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Calendar() {
  const { events } = useEventContext();
  const currentMonth = dayjs().month();
  const daysInMonth = dayjs().daysInMonth();
  const startOfMonth = dayjs().startOf("month").day();

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

  return (
    <div className="calendar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderDays()}
    </div>
  );
}

export default Calendar;
