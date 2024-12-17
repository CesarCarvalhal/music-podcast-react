import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { Link } from 'react-router-dom';
import './styles.css';
import { usePodcastFetch } from '../../hook/usePodcastFetch ';

export const PodcastEpisodes = () => {
    const { podcastId } = useParams();
    
    const { episodes, isLoading, hasError, error, episodeCount } = usePodcastFetch(null, podcastId);

    if (isLoading) {
        return <LoadingMessage />;
    }

    if (hasError) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="podcast-episodes">
            <div className="podcast-card-episodes">
                <h2>Episodes: {episodeCount}</h2>
            </div>
            {episodes.length === 0 ? (
                <p>No hay episodios disponibles</p>
            ) : (
                <div className="podcast-episodes-list">
                    <table className="episodes-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {episodes.map((episode) => (
                                <tr key={episode.trackId}>
                                    <td>
                                        <Link
                                            className="custom-nav-bar-brand"
                                            to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                                        >
                                            {episode.trackName}
                                        </Link>
                                    </td>
                                    <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
