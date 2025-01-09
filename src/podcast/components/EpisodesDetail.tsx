import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import LoadingMessage from '../components/LoadingMessage';
import { useEpisodeDetails } from '../../hooks/useEpisodeDetails';

export const EpisodesDetail: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();

  const { episodeDetails, errorMessage } = useEpisodeDetails(podcastId, episodeId);
  if (!podcastId || !episodeId) {
    return <div>Error: Faltan parámetros de ID de podcast o episodio.</div>;
  }


  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!episodeDetails) {
    return <LoadingMessage />;
  }

  return (
    <div className="podcast-details-container">
      <div className="episode-details-right">
        <h2><strong>{episodeDetails.trackName}</strong></h2>
        <p>{episodeDetails.description}</p>
        <audio controls>
          <source src={episodeDetails.previewUrl} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  );
};
