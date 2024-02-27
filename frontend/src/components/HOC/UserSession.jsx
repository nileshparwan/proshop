import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getCookies} from "../../utils/cookies";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const UserSession = ({ children }) => {
  const userExpirationCookie = getCookies('userExpiresIn');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    if (userExpirationCookie) {
      const today = new Date();
      const specifiedDate = new Date(userExpirationCookie);
      const datesAreEqual = today.toISOString() === specifiedDate.toISOString();
      if(datesAreEqual) {
        async function logoutHandler() {
          try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
          } catch (error) {
            console.log(error);
          }
        };
        
        logoutHandler();
      }
    }
  }, [userExpirationCookie, dispatch, logoutApiCall, navigate]);

  return children;
};

export default UserSession;
