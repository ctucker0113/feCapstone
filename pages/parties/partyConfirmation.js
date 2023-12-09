/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */import Link from 'next/link';
import React from 'react';
import { Nav } from 'react-bootstrap';

function showPartyConfirmation() {
  return (
    <div className="text-center my-4" id="partyConfirmationBanner">
      <h1>Party Successfully Created!
      </h1>
      <img
        src="https://media1.tenor.com/m/Y1rAFV25rVEAAAAC/bluey-hooray.gif"
        alt="Description of the image"
        style={{
          width: '80%',
          height: '50%',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />
      <button type="button" className="btn btn-light" id="partyConfirmationBtn">
        <Link passHref href="/events/viewAllEvents">
          <Nav.Link>Customize Your Party With Events</Nav.Link>
        </Link>
      </button>
    </div>
  );
}

export default showPartyConfirmation;
