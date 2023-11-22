import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import deleteParty from '../api/PartyData';
// TO-DO: Write and Import UpdateParty

// This function creates the template for each Party card and sends it out to the rest of the program.
function PartyCard({ partyObj, onUpdate }) {
  const deleteThisParty = () => {
    if (window.confirm(`Delete ${partyObj.name}?`)) {
      deleteParty(partyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{partyObj.name}</Card.Title>
        <p className="card-text bold"><span>{partyObj.date} <br /></span></p>
        {/* // TO-DO: Create View Party Page Form and pass the routing info below  */}
        <Link href="/" passHref>
          <Button variant="info">View</Button>
        </Link>
        {/* TO-DO: Create Edit Party Page Form and pass the routing info below */}
        <Link href="/" passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisParty} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

PartyCard.propTypes = {
  partyObj: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PartyCard;
