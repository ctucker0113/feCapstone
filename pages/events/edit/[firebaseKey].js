import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../api/EventAPICalls';
import EventForm from '../../../components/eventComponents/eventForm';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  // Fetch the firebaseKey from the event
  const { firebaseKey } = router.query;

  // Make a call to the API to get the event data
  useEffect(() => {
    getSingleEvent(firebaseKey).then((response) => {
      setEditItem(response);
    });
  }, [firebaseKey]);

  // Takes the object created above and populates the Edit Form with the necessary values.
  return (<EventForm eventObj={editItem} />);
}
