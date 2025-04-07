
import React from 'react';
import { Home, Search, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileFooter: React.FC = () => {
  return (
    <footer className="mobile-footer">
      <div className="flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center px-3 py-1">
          <Home size={20} className="text-library-primary" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center px-3 py-1">
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/borrowed" className="flex flex-col items-center px-3 py-1">
          <BookOpen size={20} />
          <span className="text-xs mt-1">My Books</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center px-3 py-1">
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </footer>
  );
};

export default MobileFooter;
