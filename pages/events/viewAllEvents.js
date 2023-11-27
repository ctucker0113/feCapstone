import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import EventCard from '../../components/eventComponents/eventCard';
import { getAllEvents } from '../../api/EventAPICalls';

function ShowEvents() {
  const [events, setEvents] = useState([]);

  const displayAllEvents = () => {
    getAllEvents().then(setEvents);
  };

  useEffect(() => {
    displayAllEvents();
  });

  return (
    <div className="text-center my-4">
      <button type="button" className="btn btn-light">
        <Link passHref href="/events/newEvent">
          <Nav.Link>Create a New Event</Nav.Link>
        </Link>
      </button>
      <div className="d-flex flex-wrap">
        {events.map((event) => (
          <EventCard key={event.firebaseKey} eventObj={event} onUpdate={getAllEvents} />
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
