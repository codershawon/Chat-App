import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';


const Chats = () => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };


  async function getFile(url) {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], "test.jpg", { type: 'image/jpeg' });
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      console.log('User:', user); // Log the user object to verify it's available

      if (!user || user === null) {
        navigate("/");
        return;
      }

      const initializeChatEngine = async () => {
        try {
          console.log('Initializing ChatEngine for user:', user.email);

          const response = await axios.get('https://api.chatengine.io/users/me/', {
            headers: {
              "project-id": "7b7e46e3-4f2f-47fa-aeb1-265fd492c751",
              "user-name": user.email,
              "user-secret": user.uid
            }
          });

          console.log('ChatEngine initialized successfully:', response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error initializing ChatEngine:', error);

          // Create the user if it doesn't exist
          const formData = new FormData();
          formData.append('email', user.email);
          formData.append('username', user.email);
          formData.append('secret', user.uid);

          getFile(user.photoURL)
            .then(avatar => {
              formData.append('avatar', avatar, avatar.name);

              axios.post(
                'https://api.chatengine.io/users/',
                formData,
                { headers: { "private-key": "5769399e-30f0-42a0-9daf-4c3865af93fa"}}
              )
              .then(() => setLoading(false))
              .catch(e => console.log('Error creating ChatEngine user:', e.response))
            });
        }
      };

      initializeChatEngine();
    }
  }, [user, navigate]);

  if (!user || loading) return <div />;

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Resume Crafters Community
        </div>
        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>
      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID="7b7e46e3-4f2f-47fa-aeb1-265fd492c751"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
