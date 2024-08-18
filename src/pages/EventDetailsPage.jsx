import React from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import EventDetailsModal from "../components/EventDetailsModal";

function EventDetailsPage() {
  const { id } = useParams();
  const { events, deleteEvent } = useEventContext();
  const event = events.find((event) => event.id === parseInt(id));

  const handleDelete = () => {
    deleteEvent(event.id);
    // Redirect to calendar page after deletion
    window.location.href = "/";
  };

  if (!event) return <p>Event not found</p>;

  return (
    <div className="container mx-auto p-6">
      {event ? (
        <EventDetailsModal
          eventId={event.id}
          onClose={() => window.history.back()}
        />
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Event not found</p>
      )}
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Delete Event
      </button>
    </div>
  );
}

export default EventDetailsPage;
