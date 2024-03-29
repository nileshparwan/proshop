import React from 'react';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import Message from '../../components/Message';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createProduct, {isLoading: isCreateProductLoading}] = useCreateProductMutation();
  const [deleteProduct, {isLoading: isDeleteProductLoading}] = useDeleteProductMutation(); 

  const createProductHandler = async () => {
    if(window.confirm('Are you sure you want to create a new product')) {
      try {
        await createProduct();
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  }

  const deleteProductHandler = async (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to create a new product')) {
      try {
        const res = await deleteProduct(id);
        if (res.error) {
          toast.error(res.error.data.message);
        } else {
          toast.error('Product deleted');
        }
      } catch (error) {
        toast.error(error?.data.message || error.message);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className='text-end'>
          <Button
            className='btn-sm m-3 bg-black'
            onClick={createProductHandler}
          >
            {isCreateProductLoading? '...Loading' : (<><FaEdit /> Create Product</>)}
          </Button>
        </Col>
      </Row>

      {isLoading && <Spinner />}

      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table
            striped
            hover
            responsive
            hidden={isLoading}
            className='table-sm'
          >
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
                      onClick={(e) =>
                        !isDeleteProductLoading &&
                        deleteProductHandler(e, product._id)
                      }
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
