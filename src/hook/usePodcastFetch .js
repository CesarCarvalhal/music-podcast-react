import { useState, useEffect } from "react";

const localCache = {};

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
        if (localCache[url]) {
            console.log('Usando caché')
            setState({
                data: localCache[url],
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

            setState({
                data,
                isLoading: false,
                hasError: false,
                error: null,
            });

            localCache[url] = data;
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    message: "Error al cargar los podcasts",
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
