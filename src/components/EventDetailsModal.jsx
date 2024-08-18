import React from "react";
// import { useEventContext } from "../context/EventContext";
import EventForm from "./EventForm";
import useEventContext from '../hooks/useEventContext'; // Update import

function EventDetailsModal({ eventId, onClose }) {
  const { events, deleteEvent } = useEventContext();
  const event = events.find((event) => event.id === eventId);

  const handleDelete = () => {
    deleteEvent(eventId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-darkBg p-6 rounded-lg shadow-lg max-w-sm w-full">
        <EventForm eventToEdit={event} onClose={onClose} />
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
        >
          Delete Event
        </button>
        <button
          onClick={onClose}
          className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventDetailsModal;
