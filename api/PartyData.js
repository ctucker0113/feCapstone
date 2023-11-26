import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserParties = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Parties.json?orderBy="creatorID"&equalTo="${uid}"`, {
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

const getSingleParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Parties/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Parties/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Parties.json`, {
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

const updateParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Parties/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

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

// TODO: API calls for Events

// const getEvent(eventType)

// const createEvent(eventType)

export {
  getUserParties,
  getSingleParty,
  deleteParty,
  createParty,
  updateParty,
  getAllEvents,
  deleteEvent,
};
