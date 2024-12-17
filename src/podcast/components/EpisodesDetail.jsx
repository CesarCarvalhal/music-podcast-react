import React from 'react';
import { useParams } from 'react-router-dom';
import { usePodcastEpisodesFetch } from '../../hook/usePodcastEpisodesFetch';

export const EpisodesDetail = () => {
  const { podcastId, episodeId } = useParams();

  const { episodes, isLoading, hasError, error } = usePodcastEpisodesFetch(podcastId);

  const episodeDetails = episodes.find((episode) => episode.trackId === parseInt(episodeId));

  if (isLoading) {
    return <div>Cargando detalles del episodio...</div>;
  }

  if (hasError) {
    return <div>{error.message}</div>;
  }

  if (!episodeDetails) {
    return <div>Detalles del episodio no encontrados</div>;
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
