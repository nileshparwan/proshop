import React from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Spinner from '../components/Spinner';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice.js';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div>
            <div>{error?.data?.message || error.error}</div>
          </div>
        ) : (
          <>
            <Col md={5}>
              <Image
                height='100%'
                width='100%'
                src={product?.image}
                alt={product?.name}
                loading='lazy'
                fluid
              />
            </Col>

            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={!product?.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default ProductScreen;
