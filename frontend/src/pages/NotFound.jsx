import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[12rem] font-black text-gray-100 leading-none mb-0">404</h1>
        <div className="relative -top-20">
          <h2 className="text-4xl font-bold mb-4">Page not found</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
