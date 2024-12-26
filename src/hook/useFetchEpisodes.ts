import { useState, useEffect } from 'react';
import { Episode, UseFetchEpisodesResult } from '../types/podcast';


const useFetchEpisodes = (podcastId: string): UseFetchEpisodesResult => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!podcastId) return;

        const fetchEpisodes = async () => {
            try {
                const episodesUrl = `${import.meta.env.VITE_PODCAST_EPISODES_URL}${podcastId}&media=podcast&entity=podcastEpisode`;

                const allOriginsUrl = `${import.meta.env.VITE_ALLORIGINS_URL}${encodeURIComponent(episodesUrl)}`;

                const response = await fetch(allOriginsUrl);

                const data = await response.json();

                if (data.contents) {
                    const parsedData = JSON.parse(data.contents);
                    if (parsedData.results) {
                        setEpisodes(parsedData.results);
                    } else {
                        setHasError(true);
                        setError('No episodes found');
                    }
                } else {
                    setHasError(true);
                    setError('No episodes found');
                }
            } catch (err) {
                setHasError(true);
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEpisodes();
    }, [podcastId]);

    return { episodes, isLoading, hasError, error };
};

export default useFetchEpisodes;
