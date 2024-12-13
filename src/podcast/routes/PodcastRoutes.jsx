import { Route, Routes } from 'react-router-dom';
import { PodcastPage } from '../pages/PodcastPage';
import { Navbar } from '../../ui/components/Navbar';

export const PodcastRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PodcastPage />} />
        </Routes>
      </div>
    </>
  );
};
