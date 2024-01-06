import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PartyEventCard from '../../components/eventComponents/partyEventCard';
import { fetchPartyEventsDataFromFirebase } from '../../api/MergedDataAPICalls';

export default function ViewPartyEvents() {
  const [partyEvents, setPartyEvents] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getThisPartyEvents = (partyID) => {
    fetchPartyEventsDataFromFirebase(partyID).then(({ events }) => {
      console.warn(events);
      // Make sure events is an array before setting it
      if (Array.isArray(events)) {
        setPartyEvents(events);
      } else {
        console.error('Received events is not an array:', events);
      }
    });
  };

  useEffect(() => {
    if (firebaseKey) {
      getThisPartyEvents(firebaseKey);
    }
  }, [firebaseKey]);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {partyEvents.map((partyEvent) => (
          <PartyEventCard key={partyEvent.firebaseKey} eventObj={partyEvent} onUpdate={setPartyEvents} refreshEvents={() => getThisPartyEvents(firebaseKey)} />
        ))}
      </div>
    </div>
  );
}
