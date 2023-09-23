import { GoogleOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
const Login = () => {
const {signInWithGoogle}=useContext(AuthContext)
const navigate=useNavigate()
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        navigate("/chats")
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
    return (
        <div id='login-page'>
        <div id='login-card'>
          <h2>Welcome to Resume Crafters Community!</h2>
  
          <div
            className='login-button google'
            onClick={handleGoogleSignIn}
          >
            <GoogleOutlined /> Sign In with Google
          </div>
          </div>
          </div>
    );
};

export default Login;