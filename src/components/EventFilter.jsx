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
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-900 dark:to-pink-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300">
      <label
        htmlFor="category"
        className="block text-white mb-2 text-lg font-medium"
      >
        Filter by Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-1/2 p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
      >
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          Filtered Events
        </h3>
        <ul className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">
                    {categoryIcons[event.category]}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {event.title}
                    </h4>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(event);
                    }}
                    className="text-blue-400 hover:underline transition-colors duration-300"
                  >
                    ✏️ Edit
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(event.id);
                    }}
                    className="text-red-400 hover:underline transition-colors duration-300"
                  >
                    🗑️ Delete
                  </a>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No events found</li>
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
