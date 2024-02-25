import React from 'react';
import axios from 'axios';
import Sign from './sign';

require('dotenv').config();

export default function App() {
  const [isLogged, setIsLogged] = React.useState(false);

  function login(){};
 
  
  
  return isLogged ? <h1>Logged in</h1> : <Sign > </Sign>;
}