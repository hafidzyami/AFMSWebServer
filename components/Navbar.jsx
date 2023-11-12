import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'

function Navbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='py-3'>
        <Navbar.Brand href="/">AFMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='px-3'>Prakiraan Cuaca</Nav.Link>
            <Nav.Link href ="http://34.101.235.1:8080/dashboard/ddb116e0-7d20-11ee-a02e-a72213eb9bb7?publicId=6c24fc20-7d21-11ee-a02e-a72213eb9bb7" className='px-3'>Soil Moisture Monitoring</Nav.Link>
            <Nav.Link href="/pestmonitor" className='px-3'>Pest Monitoring</Nav.Link>
            <Nav.Link href="/servoledmonitor" className='px-3'>Servo and LED Monitoring</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars