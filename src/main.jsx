import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App bileşenini içe aktarıyoruz
import './styles/globals.css'; // CSS dosyasını içe aktarıyoruz

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
