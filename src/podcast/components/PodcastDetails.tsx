import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { usePodcast } from '../../hook/usePodcast';
import './styles.css';
import { Podcast } from '../../types/podcast';


interface PodcastFetchResponse {
  feed: {
    entry: Podcast[];
  };
}

const PODCASTS_URL = import.meta.env.VITE_PODCAST_API_URL;

export const PodcastDetails: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data, isLoading, hasError, errorMessage } = usePodcast<PodcastFetchResponse>(PODCASTS_URL);

  const podcastData = data?.feed?.entry.find(
    (entry) => entry.id.attributes['im:id'] === podcastId
  );

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (hasError) {
    return <div className="error-message">Error: {errorMessage}</div>;
  }

  if (!podcastData) {
    return <div>Podcast no encontrado</div>;
  }

  return (
    <div className="podcast-details-container">
      <div className="podcast-details-card">
        <div className="podcast-image-details">
          <Link to={`/podcast/${podcastData.id.attributes['im:id']}`} className="podcast-link">
            <img
              src={podcastData['im:image'][2].label}
              alt={podcastData['im:name'].label}
            />
          </Link>
        </div>
        <hr className="podcast-details-hr" />

        <Link to={`/podcast/${podcastData.id.attributes['im:id']}`} className="podcast-link">
          <p>
            <strong>{podcastData['im:name'].label}</strong> by {podcastData['im:artist'].label}
          </p>
        </Link>

        <hr className="podcast-details-hr" />

        <p><strong>Description:</strong></p>
        <p>{podcastData.summary.label}</p>
      </div>
    </div>
  );
};
