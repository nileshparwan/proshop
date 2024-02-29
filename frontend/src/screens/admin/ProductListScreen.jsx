import React, { useState } from 'react';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Message from '../../components/Message';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

const ProductListScreen = () => {
  const [customLoader, setCustomLoader] = useState(false);
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const handleRefreshClick = () => {
    setCustomLoader(true);
    setTimeout(() => {
      refetch();
      setCustomLoader(false);
    }, 2000);
  };

  const deleteProductHandler = (id) => {};

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className='text-end'>
          <Button className='btn-sm m-3 bg-black'>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-sm bg-black'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant='danger'
                      className='btn-sm mx-1'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
