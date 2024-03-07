import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sign from './sign';
import { useRouter } from 'next/router';

export default function App() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }
    , []);


  return user ? router.push(`/${user.userName}`) : <Sign > </Sign>;
}