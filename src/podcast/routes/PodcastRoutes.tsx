import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import PodcastPage from '../pages/PodcastPage';
import { DetailsPagePodcast } from '../pages/DetailsPagePodcast';
import { DetailsPageEpisodes } from '../pages/DetailsPageEpisodes';

const PodcastRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PodcastPage />} />
          <Route path="/podcast/:podcastId" element={<DetailsPagePodcast />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<DetailsPageEpisodes />} />
        </Routes>
      </div>
    </>
  );
};

export default PodcastRoutes;
