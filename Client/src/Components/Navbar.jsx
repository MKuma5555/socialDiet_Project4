import React from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavbarPage() {
    return (
      <>
      <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Nav className="me-auto">
            <Nav.Link href='toHome'>Home</Nav.Link>
              <br/>
              <Nav.Link href="toActivity">Activity</Nav.Link>
              <br/>
              <Nav.Link href="toGraphRecord">Graph</Nav.Link>
              <br/>
              <Nav.Link href="toInput">anyLink</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </>
    )
  }
  
  export default NavbarPage