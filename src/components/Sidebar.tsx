import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  TrendingUp, 
  Trophy, 
  Newspaper, 
  BookOpen,
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Portfolio', icon: BarChart2, path: '/portfolio' },
  { name: 'Stocks', icon: TrendingUp, path: '/stocks' },
  { name: 'Competitions', icon: Trophy, path: '/competitions' },
  { name: 'Education', icon: BookOpen, path: '/education' },
  { name: 'News', icon: Newspaper, path: '/news' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" 
            onClick={onClose}
          ></div>
          
          {/* Sidebar panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 pt-2 pr-2">
              <button
                className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                onClick={onClose}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <TrendingUp className="h-10 w-10 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-primary-500">VirtualTrade</span>
              </div>
              <nav className="mt-8 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path !== '/' && location.pathname.startsWith(item.path));
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-100 text-primary-500'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                      onClick={onClose}
                    >
                      <item.icon 
                        className={`mr-4 h-6 w-6 ${
                          isActive ? 'text-primary-500' : 'text-neutral-500'
                        }`} 
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-neutral-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <TrendingUp className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-lg font-bold text-primary-500">VirtualTrade</span>
              </div>
              <nav className="mt-8 flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path !== '/' && location.pathname.startsWith(item.path));
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-100 text-primary-500'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <item.icon 
                        className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-primary-500' : 'text-neutral-500'
                        }`} 
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;