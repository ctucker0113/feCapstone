import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import PartyCard from '../../components/partyCard';
import { getUserParties } from '../../api/PartyData';

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
      <button type="button" className="btn btn-light">
        <Link passHref href="/parties/newParty">
          <Nav.Link>Create a New Party</Nav.Link>
        </Link>
      </button>
      <div className="d-flex flex-wrap">
        {parties.map((party) => (
          <PartyCard key={party.firebaseKey} partyObj={party} onUpdate={getAllParties} />
        ))}
      </div>
    </div>
  );
}

export default ShowParties;
