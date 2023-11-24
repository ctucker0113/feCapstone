import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createParty, updateParty } from '../api/PartyData';

const initialState = {
  party_title: '',
  date: '',
  time: '',
  location: '',
  uid: '',
};

function PartyForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    // If the object already exists (i.e. - has a FB key), then fill the form with the values from the object.
    // Else, leave the values in the form blank.
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
    if (obj.firebaseKey) {
      // Make the Update API call and then route the user to the Parties page.
      updateParty(formInput).then(() => router.push('/Parties'));
      // Else start running the Create Party function
    } else {
      const payload = { ...formInput, creatorID: user.uid };
      createParty(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateParty(patchPayload).then(() => {
          router.push('/parties');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Party</h2>

      {/* PARTY TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Party Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Party Title"
          name="party_title"
          value={formInput.party_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DATE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Date"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TIME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Time" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Time"
          name="time"
          value={formInput.time}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Location"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Party </Button>
    </Form>
  );
}

PartyForm.propTypes = {
  obj: PropTypes.shape({
    party_title: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    creatorID: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PartyForm.defaultProps = {
  obj: initialState,
};

export default PartyForm;
