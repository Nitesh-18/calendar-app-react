import React, { useState } from "react";
import useEventContext from "../hooks/useEventContext";

function EventFilter() {
  const { events, deleteEvent, editEvent } = useEventContext();
  const [category, setCategory] = useState("");
  const [editEventState, setEditEventState] = useState(null);

  const filteredEvents = category
    ? events.filter((event) => event.category === category)
    : events;

  const handleEdit = (event) => {
    setEditEventState(event);
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

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
                className="flex justify-between items-center p-2 border-b border-gray-300 dark:border-gray-700"
              >
                <a
                  href={`/event/${event.id}`}
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  {event.title}
                </a>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEdit(event)}
                    className="mr-2 text-blue-500 dark:text-blue-300 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 dark:text-red-300 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 dark:text-gray-400">
              No events found
            </li>
          )}
        </ul>
      </div>
      {editEventState && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <EventForm
            eventToEdit={editEventState}
            onClose={() => setEditEventState(null)}
          />
        </div>
      )}
    </div>
  );
}

export default EventFilter;
