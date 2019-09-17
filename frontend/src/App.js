import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './atoms/';
import { ApiProvider } from './utils/api';
import { AuthProvider } from './utils/auth';
import { Routes } from './Routes';

function AllProviders({ children }) {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <ScrollToTop />
          {children}
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
}

export function App() {
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  );
}
