import { useState, useEffect } from 'react';

const CACHE_KEY_PODCAST = 'podcast_data';
const CACHE_TIMESTAMP_KEY_PODCAST = 'podcast_data_timestamp';
const CACHE_KEY_EPISODES = 'podcast_episodes_cache';
const CACHE_TIMESTAMP_KEY_EPISODES = 'podcast_episodes_cache_timestamp';

export const usePodcastFetch = (url, podcastId = null) => {
  const [state, setState] = useState({
    data: null,
    episodes: [],
    isLoading: true,
    hasError: false,
    error: null,
    episodeCount: 0,
  });

  useEffect(() => {
    if (podcastId) {
      fetchPodcastEpisodes(podcastId);
    } else if (url) {
      fetchPodcastData(url);
    }
  }, [url, podcastId]);

  const setLoadingState = () => {
    setState({
      data: null,
      episodes: [],
      isLoading: true,
      hasError: false,
      error: null,
      episodeCount: 0,
    });
  };

  const fetchPodcastData = async (url) => {
    const cachedData = localStorage.getItem(CACHE_KEY_PODCAST);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY_PODCAST);
    const currentTimestamp = Date.now();

    if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 24 * 60 * 60 * 1000) {
      setState({
        data: JSON.parse(cachedData),
        episodes: [],
        isLoading: false,
        hasError: false,
        error: null,
        episodeCount: 0,
      });
      return;
    }

    setLoadingState();

    try {
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

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
          episodes: [],
          isLoading: false,
          hasError: false,
          error: null,
          episodeCount: 0,
        });
      } else {
        setState({
          data: null,
          episodes: [],
          isLoading: false,
          hasError: true,
          error: { message: 'No se pudieron obtener los datos del podcast' },
          episodeCount: 0,
        });
      }
    } catch (error) {
      setState({
        data: null,
        episodes: [],
        isLoading: false,
        hasError: true,
        error: { message: 'Error al cargar los datos del podcast' },
        episodeCount: 0,
      });
    }
  };

  const fetchPodcastEpisodes = async (podcastId) => {
    const cachedData = localStorage.getItem(`${CACHE_KEY_EPISODES}_${podcastId}`);
    const cachedTimestamp = localStorage.getItem(`${CACHE_TIMESTAMP_KEY_EPISODES}_${podcastId}`);
    const currentTimestamp = Date.now();

    if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 24 * 60 * 60 * 1000) {
      setState({
        episodes: JSON.parse(cachedData),
        data: null,
        isLoading: false,
        hasError: false,
        error: null,
        episodeCount: JSON.parse(cachedData).length,
      });
      return;
    }

    setLoadingState();

    try {
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + podcastId + '&media=podcast&entity=podcastEpisode')}`;

      const response = await fetch(allOriginsUrl);
      const data = await response.json();

      if (data.contents) {
        const parsedData = JSON.parse(data.contents);

        if (parsedData.results) {
          const episodes = parsedData.results;

          localStorage.setItem(`${CACHE_KEY_EPISODES}_${podcastId}`, JSON.stringify(episodes));
          localStorage.setItem(`${CACHE_TIMESTAMP_KEY_EPISODES}_${podcastId}`, currentTimestamp.toString());

          setState({
            episodes,
            data: null,
            isLoading: false,
            hasError: false,
            error: null,
            episodeCount: episodes.length,
          });
        } else {
          setState({
            episodes: [],
            data: null,
            isLoading: false,
            hasError: true,
            error: { message: 'No se encontraron episodios' },
            episodeCount: 0,
          });
        }
      } else {
        setState({
          episodes: [],
          data: null,
          isLoading: false,
          hasError: true,
          error: { message: 'No se pudo obtener los episodios' },
          episodeCount: 0,
        });
      }
    } catch (error) {
      setState({
        episodes: [],
        data: null,
        isLoading: false,
        hasError: true,
        error: { message: 'Error al obtener los episodios' },
        episodeCount: 0,
      });
    }
  };

  return {
    data: state.data,
    episodes: state.episodes,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
    episodeCount: state.episodeCount,
  };
};
