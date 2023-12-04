import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPartyEvents } from '../../api/EventAPICalls';
import EventCard from '../../components/eventComponents/eventCard';

export default function ViewPartyEvents() {
  const [partyEvents, setPartyEvents] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getThisPartyEvents = (partyID) => {
    getPartyEvents(partyID).then((events) => {
      console.warn('Received party events:', events);
      // Make sure events is an array before setting it
      if (Array.isArray(events)) {
        setPartyEvents(events);
      } else {
        console.error('Received events is not an array:', events);
      }
    });
  };

  useEffect(() => {
    getThisPartyEvents(firebaseKey);
  }, [firebaseKey]);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {partyEvents.map((partyEvent) => (
          <EventCard key={partyEvent.firebaseKey} eventObj={partyEvent} onUpdate={setPartyEvents} />
        ))}
      </div>
    </div>
  );
}
