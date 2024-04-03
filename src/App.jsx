import React, { useState, useEffect } from "react";
import AddEventForm from "./AddEventForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleAddEvent = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  };

  return (
    <div>
      {showForm ? (
        <AddEventForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          {events.map((event, index) => (
            <div key={index}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <img src={event.image} alt={event.title} />
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Categories: {event.categoryIds.join(", ")}</p>
            </div>
          ))}
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default App;
