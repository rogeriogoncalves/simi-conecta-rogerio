import React from 'react';
import { AuthProvider } from './auth';

function ApplicationProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ApplicationProvider;
