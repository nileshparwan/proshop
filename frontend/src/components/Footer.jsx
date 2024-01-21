import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-dark text-white fixed-bottom'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Proshop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer