import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import FormContainer from '../../components/FormContainer';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useGetUserDetailsQuery(userId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [updateUser, { isLoading: isupdateUserLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    setName(user?.name || '');
    setEmail(String(user?.email) || '0');
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const update = {
      userId,
      name,
      email,
      isAdmin
    };

    const result = await updateUser(update);

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success('user updated');
      refetch();
      navigate('/admin/userList');
    }
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn bg-black text-white my-3'>
        Back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>

        {(isupdateUserLoading || isLoading) && <Spinner />}

        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form hidden={isLoading} onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                placeholder='Enter name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button
              type='submit'
              className='my-2 bg-black'
              disabled={isupdateUserLoading}
            >
              {isupdateUserLoading ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
