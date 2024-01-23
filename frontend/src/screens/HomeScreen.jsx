import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import products from '../products';
import Spinner from '../components/Spinner';
const Product = React.lazy(() => import('../components/Product'));

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const result = await axios.get('/api/products');
    if (result) {
      setProducts(result.data);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
};

export default HomeScreen