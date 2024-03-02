import React, { useEffect } from 'react';
import axios from 'axios';
import Sign from './sign';
import { useRouter } from 'next/router';

require('dotenv').config();

export default function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get(process.env.SERVER_URL + '/users/' + localStorage.getItem('username'), {
          headers: {
            Bearer: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
            setIsLogged(true);
          }
        });
    }
  }, []);

  function login(userName, password){
    
  };
 
  
  
  return isLogged ? <h1>Logged in</h1> : <Sign > </Sign>;
}