import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const Product = React.lazy(() => import('../components/Product'));

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const productsRef = useRef(0);
  const [productIsLoaded, setProductIsLoaded] = useState(false);
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  useEffect(() => {
    if (data) {
      setProductIsLoaded(true);
    }
  }, [data]);

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
          <Suspense fallback={!data && <Spinner />}>
            {data.products && (
              <Row ref={productsRef}>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Suspense>
        )}
      </Row>
      {(productIsLoaded && data )&& <Paginate pages={data.pages} page={data.page} />}
    </>
  );
};

export default HomeScreen