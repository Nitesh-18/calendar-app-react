import React from "react";
import { useEventContext } from "../context/EventContext";

function EventDetailsModal({ eventId, onClose }) {
  const { events } = useEventContext();
  const event = events.find((event) => event.id === eventId);

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-darkBg p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary">
          {event.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Date: {event.date}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Category: {event.category}
        </p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventDetailsModal;
