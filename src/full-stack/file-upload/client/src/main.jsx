import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.css';
import AuthProvider from './context/AuthContext.jsx';
import ToastProvider from './context/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
);
