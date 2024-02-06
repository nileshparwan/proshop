import React, { Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';

const Product = React.lazy(() => import('../components/Product'));

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1> Latest Products</h1>
      <Row>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant='danger'>
            <div>{error?.data?.message || error.error}</div>
          </Message>
        ) : (
          <Suspense fallback={<Spinner />}>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Suspense>
        )}
      </Row>
    </>
  );
};

export default HomeScreen