import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Admin from 'views/AdminPage/Admin';
import UserProfile from 'views/UserProfile/UserProfile';
import LoginPage from './LoginPage';

function ProtectedRoute(props) {
  const userAuth = useSelector(state => state.login.userAuth);
  const [isAdmin, setIsAdmin] = useState();
  useEffect(()=>{
    if (userAuth === 'undefined') {
      setIsAdmin(false)
    }
    if (userAuth !== 1) {
      setIsAdmin(false)
    }
    if (userAuth == 1) {
      setIsAdmin(true)
    }
  },[userAuth])
  
  return (
    <div>
      {
        isAdmin ? 
        <Admin/>
        :
        <LoginPage/>
      }
      
    </div>
  );
}

export default ProtectedRoute;