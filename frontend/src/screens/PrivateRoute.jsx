import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  //   replace -> replace passed history
  return userInfo ? <Outlet /> : <Navigate to='/login' replace={true} />;
};

export default PrivateRoute;
