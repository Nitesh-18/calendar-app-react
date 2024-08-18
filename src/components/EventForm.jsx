import React, { useState } from "react";
// import { useEventContext } from "../context/EventContext";
import useEventContext from '../hooks/useEventContext'; // Update import

function EventForm({ eventToEdit, onClose }) {
  const { addEvent, editEvent } = useEventContext();
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "");
  const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "");
  const [category, setCategory] = useState(
    eventToEdit ? eventToEdit.category : ""
  );
  const [description, setDescription] = useState(
    eventToEdit ? eventToEdit.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !category) return;

    const newEvent = {
      id: eventToEdit ? eventToEdit.id : Date.now(),
      title,
      date,
      category,
      description,
    };

    if (eventToEdit) {
      editEvent(newEvent);
    } else {
      addEvent(newEvent);
    }

    setTitle("");
    setDate("");
    setCategory("");
    setDescription("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary dark:text-primary">
        {eventToEdit ? "Edit Event" : "Add New Event"}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
      >
        {eventToEdit ? "Save Changes" : "Add Event"}
      </button>
    </form>
  );
}

export default EventForm;
