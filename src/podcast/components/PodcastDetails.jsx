import { useParams } from 'react-router-dom';
import { usePodcastFetch } from '../../hook/usePodcastFetch ';
import LoadingMessage from './LoadingMessage';
import './styles.css';

export const PodcastDetails = () => {
  const { podcastId } = useParams();

  const { data, isLoading, hasError, error } = usePodcastFetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');

  const podcastData = data?.feed?.entry.find((entry) => entry.id.attributes['im:id'] === podcastId);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (hasError) {
    return <div>{error.message}</div>;
  }

  if (!podcastData) {
    return <div>Podcast no encontrado</div>;
  }

  return (
    <div className="podcast-details-container">
      <div className="podcast-details-card">
        <img src={podcastData['im:image'][2].label} alt={podcastData['im:name'].label} />
        <hr className="podcast-details-hr" />
        <p><strong>{podcastData['im:name'].label}</strong> by {podcastData['im:artist'].label}</p>
        <hr className="podcast-details-hr" />
        <p><strong>Description:</strong></p>
        <p>{podcastData['summary'].label}</p>
      </div>
    </div>
  );
};
