import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleParty } from '../../../api/PartyData';
import PartyForm from '../../../components/partyForm';

export default function EditParty() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  // Fetch the firebaseKey from the party
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the party data
  useEffect(() => {
    getSingleParty(firebaseKey).then((response) => {
      setEditItem(response);
    });
  }, [firebaseKey]);

  // Takes the object created above and populates the Edit Form with the necessary values.
  return (<PartyForm partyObj={editItem} />);
}
