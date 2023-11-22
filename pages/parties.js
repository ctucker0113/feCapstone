import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import PartyCard from '../components/partyCard';
import { getUserParties } from '../api/PartyData';

function ShowParties() {
  const [parties, setParties] = useState([]);

  const { user } = useAuth();

  const getAllParties = () => {
    getUserParties(user.uid).then(setParties);
  };

  useEffect(() => {
    getAllParties();
  });

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {parties.map((party) => (
          <PartyCard key={party.firebaseKey} partyObj={party} onUpdate={getAllParties} />
        ))}
      </div>
    </div>
  );
}

export default ShowParties;
