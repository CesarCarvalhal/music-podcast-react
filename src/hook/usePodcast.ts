import { useState, useEffect, useCallback } from 'react';
import { FetchState } from '../types/podcast';

const CACHE_KEY_PODCAST = 'podcast_data';
const CACHE_TIMESTAMP_KEY_PODCAST = 'podcast_data_timestamp';

const ALLORIGINS_URL = import.meta.env.VITE_ALLORIGINS_URL;

export const usePodcast = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    hasError: false,
    errorMessage: '',
  });

  const setLoadingState = useCallback(() => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });
  }, []);

  const fetchPodcastData = useCallback(async (url: string) => {
    const cachedData = localStorage.getItem(CACHE_KEY_PODCAST);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY_PODCAST);
    const currentTimestamp = Date.now();

    if (cachedData && cachedTimestamp && currentTimestamp - Number(cachedTimestamp) < 24 * 60 * 60 * 1000) {
      setState({
        data: JSON.parse(cachedData),
        isLoading: false,
        hasError: false,
        errorMessage: '',
      });
      return;
    }

    setLoadingState();

    try {
      const allOriginsUrl = `${ALLORIGINS_URL}${encodeURIComponent(url)}`;
      const response = await fetch(allOriginsUrl);
      if (!response.ok) {
        throw new Error('Error fetching podcast data');
      }

      const data = await response.json();

      if (data.contents) {
        const parsedData = JSON.parse(data.contents);
        localStorage.setItem(CACHE_KEY_PODCAST, JSON.stringify(parsedData));
        localStorage.setItem(CACHE_TIMESTAMP_KEY_PODCAST, currentTimestamp.toString());

        setState({
          data: parsedData,
          isLoading: false,
          hasError: false,
          errorMessage: '',
        });
      } else {
        setState({
          data: null,
          isLoading: false,
          hasError: true,
          errorMessage: 'No se pudieron obtener los datos del podcast',
        });
      }
    } catch (error: unknown) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        errorMessage: (error as Error)?.message || 'Error desconocido',
      });
    }
  }, [setLoadingState]);

  useEffect(() => {
    if (url) {
      fetchPodcastData(url);
    }
  }, [url, fetchPodcastData]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
  };
};
