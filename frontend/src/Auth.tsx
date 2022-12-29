import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { selectUser } from './slices/userSlice';

type Props = {
  children: ReactNode;
};

export const Auth = ({ children }: Props) => {
  const isSignedIn = useSelector(selectUser).isSignedIn;
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (!isSignedIn) {
      cookies.remove('Token');
      navigate('/');
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};
