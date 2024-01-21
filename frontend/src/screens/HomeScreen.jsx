import React, { Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Spinner from '../components/Spinner';
const Product = React.lazy(() => import('../components/Product'));

const HomeScreen = () => {
  return (
    <>
      <h1> Latest Products</h1>
      <Row>
        <Suspense fallback={<Spinner />}>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Suspense>
      </Row>
    </>
  );
}

export default HomeScreen