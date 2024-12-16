import { Link } from 'react-router-dom';
import './styles.css';

export const PodcastCard = ({ podcast }) => {
  return (
    <Link
      to={`/podcast/${podcast.id.attributes['im:id']}`}
      className="podcast-card-link"
    >
      <div className="podcast-card">
        <img
          src={podcast['im:image'][2].label}
          alt={podcast['im:name'].label}
          className="podcast-image"
        />

        <div className="podcast-info">
          <h3>{podcast['im:name'].label}</h3>
          <p>Autor: {podcast['im:artist'].label}</p>
        </div>
      </div>
    </Link>
  );
};
