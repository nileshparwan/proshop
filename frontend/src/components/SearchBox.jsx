import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={onSubmitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Button
        type='submit'
        className='p-2 mx-2'
        variant='outline-light'
      >Search</Button>
    </Form>
  );
};

export default SearchBox