import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEventsPartyRelationship } from '../../api/MergedDataAPICalls';

// This function creates the template for each Event card and sends it out to the rest of the program.
function EventCard({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.name}?`)) {
      deleteEventsPartyRelationship(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={eventObj.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{eventObj.name}</Card.Title>
        <p className="card-text bold"><span>{eventObj.description} <br /></span></p>
        <Link href={`/events/addEventToParty/${eventObj.firebaseKey}`} passHref>
          <Button variant="info">Add Event To Party</Button>
        </Link>
        <Link href={`/events/edit/${eventObj.firebaseKey}`} passHref>
          <Button variant="info">Edit Event</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
