import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          {/* <h1>Proshop</h1> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App