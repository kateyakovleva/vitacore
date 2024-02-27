import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
} );

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement );
root.render(
    <React.StrictMode>
      <QueryClientProvider client={ queryClient }>
        <App/>
      </QueryClientProvider>
    </React.StrictMode>
);


reportWebVitals();
