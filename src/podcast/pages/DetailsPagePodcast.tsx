import React from 'react';
import { PodcastEpisodes } from '../components/PodcastEpisodes';
import { PodcastDetails } from '../components/PodcastDetails';

export const DetailsPagePodcast: React.FC = () => {
  return (
    <div className="details-page-container">
      <div className="left-column">
        <PodcastDetails />
      </div>
      <div className="right-column">
        <PodcastEpisodes />
      </div>
    </div>
  );
};
