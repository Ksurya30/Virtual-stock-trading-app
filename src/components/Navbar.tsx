import { Link } from 'react-router-dom';
import { Menu, Bell, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <button
            type="button"
            className="md:hidden px-4 text-neutral-500"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-primary-500 hidden md:block">VirtualTrade</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Balance */}
          <div className="hidden md:block">
            <div className="text-sm text-neutral-500">Balance</div>
            <div className="font-medium">${user?.balance.toLocaleString()}</div>
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100">
            <Bell className="h-5 w-5" />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            >
              <span className="sr-only">Open user menu</span>
              <div className="bg-primary-100 p-1 rounded-full">
                <User className="h-5 w-5 text-primary-500" />
              </div>
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
            </button>
            
            {userMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                onBlur={() => setUserMenuOpen(false)}
              >
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <button 
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;