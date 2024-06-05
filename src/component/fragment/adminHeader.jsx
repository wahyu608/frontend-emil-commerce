import React, { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
export default function AdminHeader() {
  const { logout} = useAuthStore((state) => ({
    logout: state.logout,
  }));
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    checkAuth();
    logout();
  };

  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2"> EMIL FURNITURE</div>
      <div className="relative w-1/2 flex justify-end">
        <button 
          onClick={toggleDropdown} 
          className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img src="" alt="Profile" />
        </button>
        {isOpen && (
          <>
            <button 
              onClick={closeDropdown} 
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
              <Link to="account" className="block px-4 py-2 account-link hover:text-white">Account</Link>
              <Link to="support" className="block px-4 py-2 account-link hover:text-white">Support</Link>
              <Link to="/loginAdmin" onClick={handleLogout} className="block px-4 py-2 account-link hover:text-white">Sign Out</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
