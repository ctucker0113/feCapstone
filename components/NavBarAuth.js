/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const router = useRouter();
  const [navbarBackgroundColor, setNavbarBackgroundColor] = useState('#333')

  // Define an object to map routes to background colors
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeColors = {
    '/': '#ffb070', // Custom hex color for the home page (e.g., red)
    '/parties/myParties': '#3498db', // Custom hex color for the parties page (e.g., blue)
    '/events/viewAllEvents': '#FFB36E',
    '/parties/partyConfirmation': '#3498db', // Custom hex color for the events page (e.g., green)
  };

  // Define an object to map routes to background colors for the Navbar
  const routeNavbarColors = {
    '/': '#443329', // Custom hex color for the home page Navbar (e.g., red)
    '/parties/myParties': '#30598A', // Custom hex color for the parties page Navbar (e.g., blue)
    '/events/viewAllEvents': '#E27A37',
    '/parties/partyConfirmation': '#30598A', // Custom hex color for the events page Navbar (e.g., green)
  };

  // Use useEffect to update the background color when the route changes
  useEffect(() => {
    const currentRoute = router.pathname;
    document.body.style.backgroundColor = routeColors[currentRoute] || '#333';
    // Default to dark gray
    setNavbarBackgroundColor(routeNavbarColors[currentRoute] || '#333');
  }, [routeColors, router.pathname]);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="Navbar" style={{ backgroundColor: navbarBackgroundColor }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Bluey Party Planner</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/parties/myParties">
              <Nav.Link>Parties</Nav.Link>
            </Link>
            <Link passHref href="/events/viewAllEvents">
              <Nav.Link>Events</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
