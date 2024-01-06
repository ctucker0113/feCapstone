import { getSinglePartyEvents, deleteEvent, getSingleEvent } from './EventAPICalls';
import { deleteParty, getSingleParty } from './PartyAPICalls';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Deletes a single entry from the PartyEvent joined table, assuming we already have access to the Firebase key for the joined table.
const deletePartyEvent = (partyEventID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents/${partyEventID}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// Deletes all events associated with a PARTY before deleting a party.
const deletePartyEventsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePartyEvents(firebaseKey).then((partyEventsArray) => {
    const deletePartyPromises = partyEventsArray.map((event) => deleteEvent(event.firebaseKey));

    Promise.all(deletePartyPromises).then(() => {
      deleteParty(firebaseKey).then(resolve);
    });
  }).catch(reject);
});


// Fetches a single entity from the PartyEvents joined table.
const getSinglePartyEvent = (partyEventID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents.json?orderBy="partyEventID"&equalTo="${partyEventID}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Adds a new entry to the PartyEvents joined table, allowing users to add a single event to a party.
const createPartyEventsRelationship = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Update mostly needed to patch in the PartyEvent firebaseKey for access
const updatePartyEventsRelationship = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});


// Fetches all events attached to a single party
const fetchPartyEventsDataFromFirebase = async (partyID) => {
  // Based on the partyID, fetch the Party Object
  const party = await getSingleParty(partyID);
  // console.warn(`The value of party is ${partyID}`);
  // Fetch all elements in the PartyEvents table using the party's firebaseKey
  const partyEvents = await getSinglePartyEvents(partyID);
  // console.warn('The value of partyEvents', partyEvents);
  // Now that you have access to the eventID (through PartyEvents.eventID), pull all the Event data from Events.json using those keys.
  const events = await Promise.all(
    partyEvents.map((partyEvent) => getSingleEvent(partyEvent.eventID)),
  );
  // console.warn('Events: ', events);
  return { party, events };
};

// Fetches all parties containing the same, single event

const fetchSingleEventFromAllParties = (eventID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents.json?orderBy="eventID"&equalTo="${eventID}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // Convert the object of events to an array
        const eventsArray = Object.values(data);
        resolve(eventsArray);
      } else {
        // If no data is found, resolve with an empty array
        resolve([]);
      }
    })
    .catch(reject);
});

// Deletes a single event from a single party, assuming we do not already have access to the PartyEvent Firebase key.
const deleteEventFromParty = (partyID, eventID) => {
  // Uses the partyID and the eventID to create the partyEventID
  const partyEventID = `${partyID}_${eventID}`;
  console.warn(`PartyEventID: ${partyEventID}`);
  // Uses the partyEventID to fetch the partyEvent object from Firebase
  return getSinglePartyEvent(partyEventID).then((partyEventData) => {
    // Goes into the partyEvent object and retrieves the Firebase key value so we can index on it.
    const firstKey = Object.keys(partyEventData)[0]; // Get the first (and only) key
    const { firebaseKey } = partyEventData[firstKey]; // Access firebaseKey of the object
    console.warn(firebaseKey);

    // Delete the entity in the Firebase through the entity's Firebase Key
    return fetch(`${endpoint}/PartyEvents/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json());
  });
};

// // Deletes a single EVENT from any party that contains it before deleting an event.
// const deleteEventsPartyRelationship = (firebaseKey) => new Promise((resolve, reject) => {
//   fetchSingleEventFromAllParties(firebaseKey).then((partyEventsArray) => {
//     const deletePartyPromises = partyEventsArray.map((event) => deleteEventFromParty(event.firebaseKey));

//     Promise.all(deletePartyPromises).then(() => {
//       deleteEvent(firebaseKey).then(resolve);
//     });
//   }).catch(reject);
// });

const deleteEventsPartyRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  fetchSingleEventFromAllParties(firebaseKey).then((partyEventsArray) => {
    const deletePartyPromises = partyEventsArray.map((event) => deletePartyEvent(event.firebaseKey));

    Promise.all(deletePartyPromises).then(() => {
      deleteEvent(firebaseKey).then(resolve);
    });
  });
});

export {
  deletePartyEventsRelationship,
  createPartyEventsRelationship,
  updatePartyEventsRelationship,
  fetchPartyEventsDataFromFirebase,
  deleteEventFromParty,
  deleteEventsPartyRelationship,
};
