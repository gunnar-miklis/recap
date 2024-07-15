import React from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function IsPrivate({ children }) {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) return <>{children}</>;
  return <></>;
}
