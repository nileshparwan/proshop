import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import Message from '../../components/Message';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteUserIsLoading }] = useDeleteUserMutation(); 

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        toast.error('User deleted');
        refetch();
      } catch (error) {
        toast.error(error?.data.message || error.message);
      }
    }
  };

  return (
    <>
      <h2>Users</h2>

      {isLoading && <Spinner />}

      {error ? (
        <Message variant='danger'>{error?.data.message || error.error}</Message>
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
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={`mailto:${user.email}`}
                    >
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className='btn-sm bg-black'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger mx-1'
                      className='btn-sm'
                      onClick={() =>
                        !deleteUserIsLoading && deleteHandler(user._id)
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

export default UserListScreen;
