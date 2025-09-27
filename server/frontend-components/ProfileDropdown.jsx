import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleChangePasswordClick = () => {
    setIsOpen(false);
    navigate('/change-password');
  };

  const handleLogoutClick = async () => {
    setIsOpen(false);
    
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Call the parent component's logout handler
        if (onLogout) {
          onLogout();
        } else {
          // Fallback: redirect to login or refresh page
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, try to logout locally
      if (onLogout) {
        onLogout();
      } else {
        window.location.href = '/login';
      }
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Avatar Button */}
      <div>
        <button
          type="button"
          className="flex items-center text-sm rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            {getInitials(user?.name)}
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {user?.email || 'user@example.com'}
              </div>
            </div>

            {/* Menu Items */}
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              role="menuitem"
            >
              <svg 
                className="mr-3 h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              Profile
            </button>

            <button
              onClick={handleChangePasswordClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              role="menuitem"
            >
              <svg 
                className="mr-3 h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                />
              </svg>
              Change Password
            </button>

            <div className="border-t border-gray-100">
              <button
                onClick={handleLogoutClick}
                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors duration-200"
                role="menuitem"
              >
                <svg 
                  className="mr-3 h-4 w-4 text-red-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;