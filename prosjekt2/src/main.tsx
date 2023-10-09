import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './pages/HomePage.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
);
