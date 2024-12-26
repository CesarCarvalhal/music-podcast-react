import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

export const Navbar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <nav className="custom-nav-bar">
        <Link className="custom-nav-bar-brand" to="/">Podcaster</Link>
      </nav>
      <hr className="custom-nav-bar-line" />
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};
