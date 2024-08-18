import React, { createContext, useState, useEffect } from "react";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    // Load events from localStorage on initial render
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    return savedEvents || [];
  });

  useEffect(() => {
    // Save events to localStorage whenever events change
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const editEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
