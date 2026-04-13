import React from 'react';
import { LocaleProvider } from './locale-context';
import { AuthProvider } from './auth-context';

export const AppProviders = ({ children }) => {
  return (
      <LocaleProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LocaleProvider>
  );
};
