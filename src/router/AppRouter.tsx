import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PodcastRoutes from '../podcast/routes/PodcastRoutes';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <PodcastRoutes />
    </Router>
  );
};

export default AppRouter;
