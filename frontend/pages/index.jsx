import React, { useState, useEffect } from 'react';
import Sign from './sign';
import { useRouter } from 'next/router';
import { useUser, useUserState } from '../contexts/UserContext';

export default function App() {
  const router = useRouter();
  const user = useUser();
  const setUser = useUserState();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  });

  return <>
    {
      user ? router.push('/' + user.userName) : <Sign />
    }
  </>;
}