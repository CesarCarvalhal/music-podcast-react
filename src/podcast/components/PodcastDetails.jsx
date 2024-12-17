import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { usePodcastFetch } from '../../hook/usePodcastFetch ';
import './styles.css';

export const PodcastDetails = () => {
  const { podcastId } = useParams();

  const { data, isLoading, hasError, error } = usePodcastFetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');

  const podcastData = data?.feed?.entry.find((entry) => entry.id.attributes['im:id'] === podcastId);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (hasError) {
    return <div>{error.message}</div>;
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
        <p>{podcastData['summary'].label}</p>
      </div>
    </div>
  );
};
