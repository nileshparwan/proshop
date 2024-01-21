import React from 'react';
import { Spinner as Spin } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Spin animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spin>
  );
};

export default Spinner