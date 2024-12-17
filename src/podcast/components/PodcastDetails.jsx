import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingMessage from './LoadingMessage';
import './styles.css';

export const PodcastDetails = () => {
  const { podcastId } = useParams();

  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`);
        const data = await response.json();

        const jsonData = JSON.parse(data.contents);

        const podcastData = jsonData.feed.entry.find((entry) => entry.id.attributes['im:id'] === podcastId);

        if (podcastData) {
          setPodcast({
            name: podcastData['im:name'].label,
            artistName: podcastData['im:artist'].label,
            description: podcastData['summary'].label,
            artworkUrl: podcastData['im:image'][2].label,
            releaseDate: podcastData['im:releaseDate'].attributes.label,
            collectionViewUrl: podcastData.link.attributes.href,
            genre: podcastData.category.attributes.label,
          });
        } else {
          setError('Podcast no encontrado');
        }
      } catch (error) {
        console.error('Error fetching podcast details:', error);
        setError('Error al obtener los detalles del podcast');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [podcastId]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="podcast-details-container">
      <div className="podcast-details-card">
        <img src={podcast.artworkUrl} alt={podcast.name} />
        <hr className="podcast-details-hr" />
        <p><strong>{podcast.name}</strong> by {podcast.artistName}</p>
        <hr className="podcast-details-hr" />
        <p><strong>Description:</strong></p>
        <p>{podcast.description}</p>
      </div>
    </div>
  );
};
