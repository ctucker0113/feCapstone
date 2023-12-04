import { getPartyEvents, deleteEvent } from './EventAPICalls';
import { deleteParty } from './PartyAPICalls';

const deletePartyEventsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getPartyEvents(firebaseKey).then((partyEventsArray) => {
    const deletePartyPromises = partyEventsArray.map((event) => deleteEvent(event.firebaseKey));

    Promise.all(deletePartyPromises).then(() => {
      deleteParty(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export default deletePartyEventsRelationship;
