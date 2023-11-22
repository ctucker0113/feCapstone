import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserParties } from '../../api/PartyData';
import PartyCard from '../../components/partyCard';

export default function ViewParties() {
  const [partyDetails, setPartyDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getPartyDetails = () => {
    getUserParties(firebaseKey).then(setPartyDetails);
  };

  useEffect(() => {
    getPartyDetails();
  }, [firebaseKey]);

  return (
    <div>{partyDetails.map((party) => (
      <PartyCard key={party.firebaseKey} PartyObj={party} onUpdate={getPartyDetails} />
    ))}
    </div>
  );
}
