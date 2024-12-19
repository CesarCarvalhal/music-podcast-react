import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import PodcastPage from '../pages/PodcastPage';

const PodcastRoutes: React.FC = () => {
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

export default PodcastRoutes;
