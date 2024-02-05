import React from 'react';
import { Spinner as Spin } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Spin
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block'
      }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spin>
  );
};

export default Spinner