import { useState, useEffect, createContext, useContext } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  // Load events from localStorage when the app starts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const editEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export default function useEventContext() {
  return useContext(EventContext);
}
