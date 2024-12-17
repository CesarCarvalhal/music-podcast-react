import React, { useState } from 'react';
import { usePodcastFetch } from '../../hook/usePodcastFetch ';
import LoadingMessage from './LoadingMessage';
import { PodcastCard } from './PodcastCard';
import SearchPodcasts from './SearchPodcasts';

const PODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const PodcastList = () => {
    const { data, isLoading, hasError, error } = usePodcastFetch(PODCASTS_URL);

    const podcasts = data?.feed?.entry || [];
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPodcasts = podcasts.filter(podcast => {
        const searchLowerCase = searchTerm.toLowerCase();
        const title = podcast.title.label.toLowerCase();
        const author = podcast['im:artist'].label.toLowerCase();
        return title.includes(searchLowerCase) || author.includes(searchLowerCase);
    });

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            {hasError && <div className="error-message">Error: {error.message}</div>}

            {isLoading && <LoadingMessage />}

            <div className="search-container">
                <div className="podcast-count">
                    {filteredPodcasts.length}
                </div>
                <SearchPodcasts searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>

            {Array.isArray(filteredPodcasts) && filteredPodcasts.length > 0 ? (
                <ul className="podcast-list">
                    {filteredPodcasts.map((podcast) => (
                        <li key={podcast.id.attributes['im:id']}>
                            <PodcastCard podcast={podcast} />
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && <div>No se encontraron podcasts.</div>
            )}
        </div>
    );
};
