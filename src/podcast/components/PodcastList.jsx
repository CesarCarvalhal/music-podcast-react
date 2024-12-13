import { usePodcastFetch } from '../../hook/usePodcastFetch ';
import { PodcastCard } from './PodcastCard';

const PODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const PodcastList = () => {
    const { data, isLoading, hasError, error } = usePodcastFetch(PODCASTS_URL);

    const podcasts = data?.feed?.entry || [];

    return (
        <div>
            {hasError && <div className="error-message">Error: {error.message}</div>}

            {isLoading && <div className='loading-message'>Loading podcasts...</div>}

            {Array.isArray(podcasts) && podcasts.length > 0 ? (
                <ul className="podcast-list">
                    {podcasts.map((podcast) => (
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
