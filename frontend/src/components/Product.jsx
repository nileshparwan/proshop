import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded h-auto'>
      <Link to={`/product/${product._id}`}>
        <div style={{ minHeight: '200px', width: '100%' }}>
          <Card.Img
            height='100%'
            width='100%'
            variant='top'
            loading='lazy'
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='p'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='p' className='fs-3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
