import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './context/AuthContext.jsx';
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>,
);
