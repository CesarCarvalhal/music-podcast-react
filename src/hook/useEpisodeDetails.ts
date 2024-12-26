import { useState, useEffect } from 'react';

interface Episode {
  trackId: number;
  trackName: string;
  description: string;
  previewUrl: string;
}

export const useEpisodeDetails = (podcastId: string | undefined, episodeId: string | undefined) => {
    const [episodeDetails, setEpisodeDetails] = useState<Episode | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!podcastId || !episodeId) {
        setError('Faltan parámetros de ID de podcast o episodio');
        return;
      }
  
      const fetchEpisodeDetails = async () => {
        try {
          const episodesUrl = `${import.meta.env.VITE_PODCAST_EPISODES_URL}${podcastId}&media=podcast&entity=podcastEpisode`;
          const allOriginsUrl = `${import.meta.env.VITE_ALLORIGINS_URL}${encodeURIComponent(episodesUrl)}`;
  
          const response = await fetch(allOriginsUrl);
          const data = await response.json();
          const jsonData = JSON.parse(data.contents);
  
          if (jsonData && jsonData.results) {
            const episodeData = jsonData.results.find((episode: Episode) => episode.trackId === Number(episodeId));
            if (episodeData) {
              setEpisodeDetails({
                trackId: episodeData.trackId,
                trackName: episodeData.trackName,
                description: episodeData.description,
                previewUrl: episodeData.previewUrl,
              });
            } else {
              setError('Episodio no encontrado');
            }
          } else {
            setError('No se encontraron resultados en la respuesta');
          }
        } catch (err) {
          console.error('Error fetching episode details:', err);
          setError('Error al cargar los detalles del episodio.');
        }
      };
  
      fetchEpisodeDetails();
    }, [podcastId, episodeId]);
  
    return { episodeDetails, error };
  };
  