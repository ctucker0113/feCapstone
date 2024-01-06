import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserParties } from '../../api/PartyAPICalls';
import { createPartyEventsRelationship, updatePartyEventsRelationship } from '../../api/MergedDataAPICalls';

const initialState = {
  partyID: '',
};

function AddEventToPartyForm({ eventObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [parties, setParties] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  // Define the handleChange function to update formInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  useEffect(() => {
    getUserParties(user.uid).then(setParties);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueID = `${formInput.partyID}_${firebaseKey}`;
    const payload = { partyID: formInput.partyID, eventID: firebaseKey, partyEventID: uniqueID };
    createPartyEventsRelationship(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updatePartyEventsRelationship(patchPayload).then(() => {
        router.push('/events/viewAllEvents');
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{eventObj.name}</h2>

      {/* PARTY SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Party">
        <Form.Select
          aria-label="Party"
          name="partyID"
          onChange={handleChange}
          className="mb-3"
          value={formInput.partyID}
        >
          <option value="">Add to Which Party?</option>
          {
              parties.map((party) => (
                <option
                  key={party.firebaseKey}
                  value={party.firebaseKey}
                >
                  {party.party_title}
                </option>
              ))
            }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">Add Event</Button>
    </Form>
  );
}

AddEventToPartyForm.propTypes = {
  eventObj: PropTypes.shape({
    partyID: PropTypes.string,
    name: PropTypes.string,
  }),
};

AddEventToPartyForm.defaultProps = {
  eventObj: initialState,
};

export default AddEventToPartyForm;
