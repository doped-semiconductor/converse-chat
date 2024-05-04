import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Main from "./pages/Main";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);

