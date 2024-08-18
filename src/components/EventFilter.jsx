import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";

function EventFilter() {
  const { events } = useEventContext();
  const [category, setCategory] = useState("");

  const filteredEvents = category
    ? events.filter((event) => event.category === category)
    : events;

  return (
    <div className="mb-6 p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm">
      <label
        htmlFor="category"
        className="block text-gray-700 dark:text-gray-300 mb-2"
      >
        Filter by Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
      >
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-primary dark:text-primary">
          Filtered Events
        </h3>
        <ul className="mt-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event.id}
                className="p-2 border-b border-gray-300 dark:border-gray-700"
              >
                <a
                  href={`/event/${event.id}`}
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  {event.title}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500 dark:text-gray-400">
              No events found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default EventFilter;
