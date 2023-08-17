import { useState } from 'react';

export function getToken()
{
  return JSON.parse(sessionStorage.getItem('token'));
};

export default function useToken()
{
  const [token, setToken] = useState(getToken());

  const saveToken = localToken =>
  {
    if(localToken)
      sessionStorage.setItem('token', localToken);
    else
      sessionStorage.removeItem('token');
    
    setToken(localToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
