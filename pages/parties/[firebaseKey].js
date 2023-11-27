import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleParty } from '../../api/PartyAPICalls';
import PartyCard from '../../components/partyComponents/partyCard';

export default function ViewParty() {
  const [partyDetails, setPartyDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getPartyDetails = () => {
    getSingleParty(firebaseKey).then((party) => {
      setPartyDetails(party);
    });
  };

  useEffect(() => {
    getPartyDetails();
  }, [firebaseKey]);

  return (
    <div>
      <PartyCard key={partyDetails.firebaseKey} partyObj={partyDetails} onUpdate={getPartyDetails} />
      <button type="button" className="btn btn-success">Add Events</button>
    </div>
  );
}
