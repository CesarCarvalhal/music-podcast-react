import { useQuery } from '@tanstack/react-query';
import { Episode } from '../types/podcast';

const PODCAST_EPISODES_URL = process.env.VITE_PODCAST_EPISODES_URL || '';
const ALL_ORIGINS_URL = process.env.VITE_ALLORIGINS_URL || '';

export const useEpisodeDetails = (podcastId: string | undefined, episodeId: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery<Episode | null, Error>({
    queryKey: ['episodeDetails', podcastId, episodeId],
    queryFn: async () => {
      if (!podcastId || !episodeId) {
        throw new Error('Faltan parámetros de ID de podcast o episodio');
      }

      const episodesUrl = `${PODCAST_EPISODES_URL}${podcastId}&media=podcast&entity=podcastEpisode`;
      const allOriginsUrl = `${ALL_ORIGINS_URL}${encodeURIComponent(episodesUrl)}`;

      const response = await fetch(allOriginsUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del episodio');
      }

      const data = await response.json();
      const jsonData = JSON.parse(data.contents);

      if (jsonData && jsonData.results) {
        const episodeData = jsonData.results.find((episode: Episode) => episode.trackId === Number(episodeId));
        if (episodeData) {
          return {
            trackId: episodeData.trackId,
            trackName: episodeData.trackName,
            description: episodeData.description,
            previewUrl: episodeData.previewUrl,
          };
        } else {
          throw new Error('Episodio no encontrado');
        }
      } else {
        throw new Error('No se encontraron resultados en la respuesta');
      }
    },
    enabled: !!podcastId && !!episodeId,
  });

  return {
    episodeDetails: data,
    isLoading,
    hasError: isError,
    errorMessage: error?.message || '',
  };
};
