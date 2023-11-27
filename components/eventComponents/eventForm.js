import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateEvent, createEvent } from '../../api/EventAPICalls';

const initialState = {
  name: '',
  eventType: '',
  image: '',
  description: '',
  uid: '',
};

function EventForm({ eventObj }) {
  console.warn(`The value of eventObj is: ${eventObj}`);
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    // If the object already exists (i.e. - has a FB key), then fill the form with the values from the object.
    // Else, leave the values in the form blank.
    if (eventObj.firebaseKey) setFormInput(eventObj);
  }, [eventObj, user]);

  const handleChange = (e) => {
    // Overall point of this function is to allow the user to type inside the form and to have that data stored with each keystroke.
    // Declares 2 variables, 'name,' and 'value' to be added to info later
    const { name, value } = e.target;
    // "Refreshes" the page with a taco called prevState
    setFormInput((prevState) => ({
      // "Spreads" the prevState so that new values can be added to it.
      ...prevState,
      // Combines [name]: value with prevState, either adding the values or updating them depending on the state of the form (update or create)
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the item already exists in the database...
    if (eventObj.firebaseKey) {
      // Make the Update API call and then route the user to the Events page.
      updateEvent(formInput).then(() => router.push('/events/viewAllEvents'));
      // Else start running the Create Event function
    } else {
      const payload = { ...formInput, creatorID: user.uid };
      createEvent(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEvent(patchPayload).then(() => {
          router.push('/events/viewAllEvents');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{eventObj.firebaseKey ? 'Update' : 'Create'} Event</h2>

      {/* EVENT NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Event Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EVENT TYPE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Type"
          name="eventType"
          value={formInput.eventType}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EVENT IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EVENT DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{eventObj.firebaseKey ? 'Update' : 'Create'} Event </Button>
    </Form>
  );
}

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    name: PropTypes.string,
    eventType: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    creatorID: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
