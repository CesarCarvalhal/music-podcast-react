import { useState, useEffect } from 'react';

const CACHE_KEY_EPISODES = 'podcast_episodes_cache';
const CACHE_TIMESTAMP_KEY_EPISODES = 'podcast_episodes_cache_timestamp';

export const usePodcastEpisodesFetch = (podcastId) => {
  const [state, setState] = useState({
    episodes: [],
    isLoading: true,
    hasError: false,
    error: null,
    episodeCount: 0,
  });

  useEffect(() => {
    if (podcastId) {
      fetchPodcastEpisodes(podcastId);
    }
  }, [podcastId]);

  const setLoadingState = () => {
    setState({
      episodes: [],
      isLoading: true,
      hasError: false,
      error: null,
      episodeCount: 0,
    });
  };

  const fetchPodcastEpisodes = async (podcastId) => {
    const cachedData = localStorage.getItem(`${CACHE_KEY_EPISODES}_${podcastId}`);
    const cachedTimestamp = localStorage.getItem(`${CACHE_TIMESTAMP_KEY_EPISODES}_${podcastId}`);
    const currentTimestamp = Date.now();

    if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 24 * 60 * 60 * 1000) {
      setState({
        episodes: JSON.parse(cachedData),
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
            isLoading: false,
            hasError: false,
            error: null,
            episodeCount: episodes.length,
          });
        } else {
          setState({
            episodes: [],
            isLoading: false,
            hasError: true,
            error: { message: 'No se encontraron episodios' },
            episodeCount: 0,
          });
        }
      } else {
        setState({
          episodes: [],
          isLoading: false,
          hasError: true,
          error: { message: 'No se pudo obtener los datos de AllOrigins' },
          episodeCount: 0,
        });
      }
    } catch (error) {
      setState({
        episodes: [],
        isLoading: false,
        hasError: true,
        error: { message: 'Error al obtener los episodios' },
        episodeCount: 0,
      });
    }
  };

  return {
    episodes: state.episodes,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
    episodeCount: state.episodeCount,
  };
};
