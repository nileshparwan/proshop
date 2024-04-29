import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout } from "../../slices/authSlice";

const UserSession = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return children;
};

export default UserSession;
