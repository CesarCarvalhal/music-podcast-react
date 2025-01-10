import { useQuery } from '@tanstack/react-query';

const CACHE_KEY_PODCAST = 'podcast_data';
const CACHE_TIMESTAMP_KEY_PODCAST = 'podcast_data_timestamp';
const ALLORIGINS_URL = process.env.VITE_ALLORIGINS_URL;

export const usePodcast = <T,>(url: string) => {
  const { data, isLoading, isError, error } = useQuery<T, Error>({
    queryKey: [CACHE_KEY_PODCAST, url],
    queryFn: async () => {
      const cachedData = localStorage.getItem(CACHE_KEY_PODCAST);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY_PODCAST);
      const currentTimestamp = Date.now();

      if (cachedData && cachedTimestamp && currentTimestamp - Number(cachedTimestamp) < 24 * 60 * 60 * 1000) {
        return JSON.parse(cachedData);
      }

      const allOriginsUrl = `${ALLORIGINS_URL}${encodeURIComponent(url)}`;
      const response = await fetch(allOriginsUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del podcast');
      }

      const data = await response.json();

      if (data.contents) {
        const parsedData = JSON.parse(data.contents);
        localStorage.setItem(CACHE_KEY_PODCAST, JSON.stringify(parsedData));
        localStorage.setItem(CACHE_TIMESTAMP_KEY_PODCAST, currentTimestamp.toString());
        return parsedData;
      } else {
        throw new Error('No se pudieron recuperar los datos del podcast');
      }
    },
    enabled: !!url,
  });

  return {
    data,
    isLoading,
    hasError: isError,
    errorMessage: error?.message || '',
  };
};
