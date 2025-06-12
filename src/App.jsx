import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import CheckIn  from './components/CheckIn.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckInForm from "./components/CheckInForm";
import Home from "./pages/Home";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import ConciergeServices from './pages/ConciergeServices';
import RequestHistory from "./pages/RequestHistory";
import PraticalInfo from "./pages/PraticalInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckInForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<ConciergeServices />} />
        <Route path="/services/history" element={<RequestHistory />} />
        <Route path="/infos" element={<PraticalInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


