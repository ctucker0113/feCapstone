/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <img
        // eslint-disable-next-line max-len
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b106723d-9469-4dc7-b086-be4738b82ff5/df00zhz-4a6efde6-d666-49d0-a067-12980d69abc1.jpg/v1/fit/w_486,h_715,q_70,strp/chilli_heeler_wave__by_josh247_df00zhz-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE1IiwicGF0aCI6IlwvZlwvYjEwNjcyM2QtOTQ2OS00ZGM3LWIwODYtYmU0NzM4YjgyZmY1XC9kZjAwemh6LTRhNmVmZGU2LWQ2NjYtNDlkMC1hMDY3LTEyOTgwZDY5YWJjMS5qcGciLCJ3aWR0aCI6Ijw9NDg2In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.5yBKBX0oAp3vIq3dWoSnAsLJUl0qKv6Y5Ud19OScBiU"
        alt="Description of the image"
        style={{
          width: '100%',
          height: '50%',
          marginTop: '20px',
        }}
      />
    </div>
  );
}

export default Home;
