import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteEventFromParty } from '../../api/MergedDataAPICalls';
// This function creates the template for each Event card and sends it out to the rest of the program.

function PartyEventCard({ eventObj, refreshEvents }) {
// Fetch the PartyID by pulling the firebaseKey from the URL.
  const router = useRouter();
  const { firebaseKey } = router.query;

  const removeThisEvent = () => {
    if (window.confirm(`Remove ${eventObj.name}?`)) {
      deleteEventFromParty(firebaseKey, eventObj.firebaseKey).then(() => {
        // Refresh the page after removing the event.
        refreshEvents();
      });
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={eventObj.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{eventObj.name}</Card.Title>
        <p className="card-text bold"><span>{eventObj.description} <br /></span></p>
        <Button variant="danger" onClick={removeThisEvent} className="m-2">
          Remove Event
        </Button>
      </Card.Body>
    </Card>
  );
}

PartyEventCard.propTypes = {
  eventObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  refreshEvents: PropTypes.func.isRequired,
};

export default PartyEventCard;
