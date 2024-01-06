import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllEvents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Events.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteEvent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Events/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Events/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Events.json`, {
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

const getSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Events/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePartyEvents = (partyID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/PartyEvents.json?orderBy="partyID"&equalTo="${partyID}"`, {
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

export {
  getAllEvents,
  deleteEvent,
  updateEvent,
  createEvent,
  getSingleEvent,
  getSinglePartyEvents,
};
