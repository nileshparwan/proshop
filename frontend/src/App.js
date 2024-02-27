import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import UserSession from './components/HOC/UserSession';

const App = () => {
  return (
    <UserSession>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
          <SpeedInsights />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </UserSession>
  );
}

export default App