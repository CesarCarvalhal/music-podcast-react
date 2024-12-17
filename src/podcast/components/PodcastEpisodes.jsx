import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { Link } from 'react-router-dom';
import './styles.css';

export const PodcastEpisodes = () => {
    const { podcastId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [episodeCount, setEpisodeCount] = useState(0);

    useEffect(() => {
        const fetchPodcastEpisodes = async () => {
            try {
                const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`);
                const data = await response.json();

                if (data.results) {
                    setEpisodes(data.results); 
                    setEpisodeCount(data.resultCount); 
                } else {
                    setError('No se encontraron episodios');
                }
            } catch (error) {
                console.error('Error fetching podcast episodes:', error);
                setError('Error al obtener los episodios');
            } finally {
                setLoading(false);
            }
        };

        fetchPodcastEpisodes();
    }, [podcastId]);

    if (loading) {
        return <LoadingMessage />;
    }

    if (error) {
        return <div>{error}</div>;
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
