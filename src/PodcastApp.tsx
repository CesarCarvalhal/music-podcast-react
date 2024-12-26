import React from 'react';
import AppRouter from './router/AppRouter';

const PodcastApp: React.FC = () => {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};

export default PodcastApp;
