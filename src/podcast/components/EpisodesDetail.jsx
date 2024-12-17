import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export const EpisodesDetail = () => {
  const { podcastId, episodeId } = useParams();
  const [episodeDetails, setEpisodeDetails] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`);
        const data = await response.json();

        const episode = data.results.find((ep) => ep.trackId === parseInt(episodeId));
        if (episode) {
          setEpisodeDetails(episode);
        } else {
          setEpisodeDetails(null);
        }
      } catch (error) {
        console.error('Error fetching episode details:', error);
      }
    };

    fetchEpisodeDetails();
  }, [podcastId, episodeId]);

  if (!episodeDetails) {
    return <div>Cargando detalles del episodio...</div>;
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
