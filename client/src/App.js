import React, { useState } from 'react';
import ReservationForm from './ReservationForm';
import ReservationList from './ReservationList';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [view, setView] = useState('receptionist');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Hotel Reservation System</h1>
        <button onClick={toggleMenu} className="text-2xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
      {menuOpen && (
        <div className="flex flex-col items-center bg-blue-500 text-white">
          <button onClick={() => { setView('receptionist'); setMenuOpen(false); }} className="menu-button">
            Receptionist View
          </button>
          <button onClick={() => { setView('admin'); setMenuOpen(false); }} className="menu-button">
            Admin View
          </button>
        </div>
      )}
      <div className="p-4">
        {view === 'receptionist' && (
          <>
            <ReservationForm />
            <ReservationList />
          </>
        )}
        {view === 'admin' && (isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />)}
      </div>
    </div>
  );
}

export default App;