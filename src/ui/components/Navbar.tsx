import React from 'react';
import { Link } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import './styles.scss';

export const Navbar: React.FC = () => {
  const isFetching = useIsFetching();

  return (
    <>
      <nav className="custom-nav-bar">
        <Link className="custom-nav-bar-brand" to="/">Podcaster</Link>

        {isFetching > 0 && (
          <div className="loading-indicator" data-testid="spinner">
            <div className="spinner"></div>
          </div>
        )}
      </nav>
      <hr className="custom-nav-bar-line" />
    </>
  );
};
