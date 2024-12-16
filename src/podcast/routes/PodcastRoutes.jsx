import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { PodcastPage, PodcastDetails } from '../pages';

export const PodcastRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PodcastPage />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
        </Routes>
      </div>
    </>
  );
};
