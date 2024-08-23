import React, { useState } from "react";
import useEventContext from "../hooks/useEventContext";

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
    setDescription("");
    setDate("");
    setCategory("");

    onClose();
  };

  const formSizeClass = eventToEdit ? "w-full" : "w-full lg:w-1/2";
  const dateCategorySizeClass = eventToEdit ? "w-full" : "w-full lg:w-1/3";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-700 dark:via-purple-900 dark:to-pink-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg space-y-6 mb-12"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {eventToEdit ? "Edit Event" : "Add New Event"}
      </h2>
      <div className={`mb-5 ${formSizeClass}`}>
        <label htmlFor="title" className="block text-lg font-medium text-white">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />
      </div>
      <div className={`mb-5 ${formSizeClass}`}>
        <label
          htmlFor="description"
          className="block text-lg font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          rows="5"
        />
      </div>
      <div className={`mb-5 ${dateCategorySizeClass}`}>
        <label htmlFor="date" className="block text-lg font-medium text-white">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 appearance-none"
        />
      </div>

      <div className={`mb-5 ${dateCategorySizeClass}`}>
        <label
          htmlFor="category"
          className="block text-lg font-medium text-white"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          {eventToEdit ? "Save Changes" : "Add Event"}
        </button>
      </div>
    </form>
  );
}

export default EventForm;
