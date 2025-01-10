import { useQuery } from '@tanstack/react-query';
import { Episode } from '../types/podcast';

const PODCAST_EPISODES_URL = process.env.VITE_PODCAST_EPISODES_URL || '';
const ALL_ORIGINS_URL = process.env.VITE_ALLORIGINS_URL || '';

export const useEpisodes = (podcastId: string) => {
  const { data, isLoading, isError, error } = useQuery<Episode[], Error>({
    queryKey: ['episodes', podcastId],
    queryFn: async () => {
      if (!podcastId) {
        throw new Error('No se proporcionó el ID del podcast');
      }

      const episodesUrl = `${PODCAST_EPISODES_URL}${podcastId}&media=podcast&entity=podcastEpisode`;
      const allOriginsUrl = `${ALL_ORIGINS_URL}${encodeURIComponent(episodesUrl)}`;

      const response = await fetch(allOriginsUrl);

      if (!response.ok) {
        throw new Error('Error al obtener los episodios del podcast');
      }

      const data = await response.json();

      if (data.contents) {
        const parsedData = JSON.parse(data.contents);
        if (parsedData.results) {
          return parsedData.results;
        } else {
          throw new Error('No se encontraron episodios');
        }
      } else {
        throw new Error('No se encontraron episodios');
      }
    },
    enabled: !!podcastId,
  });

  return {
    episodes: data || [],
    isLoading,
    hasError: isError,
    error: error?.message || '',
  };
};
