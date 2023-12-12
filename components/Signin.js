import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'whitesmoke',
      }}
    >
    <h1> Welcome to the </h1>
      <img
        // eslint-disable-next-line max-len
        src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ff04cfb6c-3acc-4e7e-b02b-5aeea4da5aed_640x634.webp"
        alt="Dancing"
        style={{
          width: '100%',
          height: '50%',
          marginTop: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '10%',
        }}
      />
      <h1>Party Planner</h1>
      <Button type="button" size="lg" className="copy-btn" id="loginBtn" onClick={signIn}>
        Login to Get the Party Started!
      </Button>
    </div>
  );
}

export default Signin;
