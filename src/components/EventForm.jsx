import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";

function EventForm() {
  const { addEvent } = useEventContext();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !category) return;

    const newEvent = {
      id: Date.now(),
      title,
      date,
      category,
    };

    addEvent(newEvent);
    setTitle("");
    setDate("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary dark:text-primary">
        Add New Event
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
        Add Event
      </button>
    </form>
  );
}

export default EventForm;
