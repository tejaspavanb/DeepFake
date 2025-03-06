import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Image, Video, Info } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <span className="text-xl font-bold">DeepFake Detective</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/image-detection"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/image-detection')}`}
            >
              <Image className="w-4 h-4" />
              <span>Image Detection</span>
            </Link>
            
            <Link
              to="/video-detection"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/video-detection')}`}
            >
              <Video className="w-4 h-4" />
              <span>Video Detection</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/about')}`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;