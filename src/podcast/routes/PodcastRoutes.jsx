import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { DetailsPagePodcast } from '../pages/DetailsPagePodcast';
import { DetailsPageEpisodes } from '../pages/DetailsPageEpisodes';
import { PodcastPage } from '../pages/PodcastPage';

export const PodcastRoutes = () => {
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
