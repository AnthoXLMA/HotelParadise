import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckIn from './components/CheckIn.jsx';
import CheckInForm from "./components/CheckInForm";
import Home from "./pages/Home";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import ConciergeServices from './pages/ConciergeServices';
import RequestHistory from "./pages/RequestHistory";
import PraticalInfo from "./pages/PraticalInfo";
import HotelInfo from './components/HotelInfo';
import PrivateRoute from './components/PrivateRoute.jsx';
import HotelierDashboard from "./pages/HotelierDashboard";
import HotelierLogin from "./components/Auth/HotelierLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckInForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
          <Route element={<PrivateRoute />}>
            <Route path="/hotelier/dashboard" element={<HotelierDashboard />} />
          </Route>
        <Route path="/hotelier/login" element={<HotelierLogin />} />
        <Route path="/services" element={<ConciergeServices />} />
        <Route path="/services/history" element={<RequestHistory />} />
        <Route path="/infos" element={<PraticalInfo />} />
        <Route path="/hotelinfo" element={<HotelInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
