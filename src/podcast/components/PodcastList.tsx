import React from 'react';
import { PodcastCard } from './PodcastCard';
import { usePodcasts } from '../../hook/usePodcasts';
import LoadingMessage from './LoadingMessage'; 
import './styles.css'; 

export const PodcastList: React.FC = () => {
  const { podcasts, loading, error } = usePodcasts();

  if (loading) {
    return <LoadingMessage />; 
  }

  if (error) {
    return <div className="loading-message">{error}</div>;
  }

  return (
    <div className="podcast-list">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id.attributes['im:id']} podcast={podcast} />
      ))}
    </div>
  );
};
