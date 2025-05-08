import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <AlertTriangle className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-neutral-900">
          404 - Page Not Found
        </h2>
        <p className="mt-2 text-neutral-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;