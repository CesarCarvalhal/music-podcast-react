import { useState, useEffect } from 'react';

const CACHE_KEY = 'podcasts_data';
const CACHE_TIMESTAMP_KEY = 'podcasts_data_timestamp';

export const usePodcastFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {
        if (url) {
            fetchPodcasts();
        }
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    };

    const fetchPodcasts = async () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const currentTimestamp = Date.now();

        if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 24 * 60 * 60 * 1000) {
            setState({
                data: JSON.parse(cachedData),
                isLoading: false,
                hasError: false,
                error: null,
            });
            return;
        }

        setLoadingState();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                setState({
                    data: null,
                    isLoading: false,
                    hasError: true,
                    error: {
                        code: response.status,
                        message: response.statusText,
                    },
                });
                return;
            }

            const data = await response.json();

            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, currentTimestamp.toString());

            setState({
                data,
                isLoading: false,
                hasError: false,
                error: null,
            });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    message: 'Error al cargar los podcasts',
                },
            });
        }
    };

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        error: state.error,
    };
};
