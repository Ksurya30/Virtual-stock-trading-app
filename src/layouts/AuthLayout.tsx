import { Outlet, Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2">
          <TrendingUp className="h-10 w-10 text-primary-500" />
          <span className="text-2xl font-bold text-primary-500">VirtualTrade</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          Welcome to Virtual Stock Trading
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Practice trading stocks with virtual money in a risk-free environment
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;