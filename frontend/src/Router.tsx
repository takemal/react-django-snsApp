import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import { Auth } from './Auth';
import { Login } from './components/Login';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Authコンテンツ */}
      {/* prettier-ignore */}
      <Route path="/profiles" element={<Auth><App /></Auth>} />
    </Routes>
  );
};
