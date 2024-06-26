import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import FormContainer from '../../components/FormContainer';
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error
  } = useGetProductDetailsQuery(productId);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [deleteProductImage] = useDeleteProductImageMutation();

  useEffect(() => {
    setName(product?.name || '');
    setPrice(String(product?.price) || '0');
    setImage(product?.image || '');
    setBrand(product?.brand || '');
    setCategory(product?.category || '');
    setCountInStock(product?.countInStock || 0);
    setDescription(product?.description || '');
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const update = {
      productId,
      name,
      price: parseFloat(price),
      image,
      brand,
      category,
      countInStock,
      description
    };

    const result = await updateProduct(update);

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success('Product updated');
      navigate('/admin/productList');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
  
    try {
      const previousfile = image?.split('/')[2];
      const res = await uploadProductImage(formData).unwrap();
      if (res) {
        await deleteProductImage(previousfile);
        toast.success(res.message);
        setImage(res.image);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn bg-black text-white my-3'>
        Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {isUpdateProductLoading || isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                placeholder='Enter name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                value={price}
                placeholder='Enter price'
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                value={image}
                placeholder='Enter Image Url'
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='file'
                label="Chose file"
                onChange={uploadFileHandler}
              />
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                placeholder='Enter brand'
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='Category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                placeholder='Enter category'
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='CountInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='text'
                value={countInStock}
                placeholder='Enter Count In Stock'
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='Description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                rows={4}
                as='textarea'
                value={description}
                placeholder='Enter description...'
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' className='my-2 bg-black'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
