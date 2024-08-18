import React, { useState } from "react";
import useEventContext from "../hooks/useEventContext";
import EventForm from "./EventForm"; // Assuming EventForm is correctly imported

const categoryIcons = {
  Work: "💼",
  Personal: "🏠",
};

function EventFilter() {
  const { events, deleteEvent } = useEventContext();
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
        className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
      >
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-primary dark:text-primary mb-2">
          Filtered Events
        </h3>
        <ul className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-sm"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">
                    {categoryIcons[event.category]}
                  </span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(event);
                    }}
                    className="text-blue-500 dark:text-blue-300 hover:underline"
                  >
                    ✏️ Edit
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(event.id);
                    }}
                    className="text-red-500 dark:text-red-300 hover:underline"
                  >
                    🗑️ Delete
                  </a>
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
