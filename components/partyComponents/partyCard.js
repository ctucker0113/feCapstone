import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePartyEventsRelationship } from '../../api/MergedDataAPICalls';

// This function creates the template for each Party card and sends it out to the rest of the program.
function PartyCard({ partyObj, onUpdate }) {
  const deleteThisParty = () => {
    if (window.confirm(`Delete ${partyObj.party_title} and its associated events?`)) {
      console.warn(`The value of partyObj.firebasekey is ${partyObj.firebaseKey}`);
      deletePartyEventsRelationship(partyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{partyObj.party_title}</Card.Title>
        <p className="card-text bold"><span>{partyObj.date} <br /></span></p>
        <p className="card-text bold"><span>{partyObj.time} <br /></span></p>
        <p className="card-text bold"><span>{partyObj.location} <br /></span></p>
        <Link href={`/parties/${partyObj.firebaseKey}`} passHref>
          <Button variant="info">View Party Events</Button>
        </Link>
        <Link href={`/parties/edit/${partyObj.firebaseKey}`} passHref>
          <Button variant="info">Edit Party Details</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisParty} className="m-2">
          Delete Party
        </Button>
      </Card.Body>
    </Card>
  );
}

PartyCard.propTypes = {
  partyObj: PropTypes.shape({
    party_title: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PartyCard;
