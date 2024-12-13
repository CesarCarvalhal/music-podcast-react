import './styles.css';

export const PodcastCard = ({ podcast }) => {
  return (
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
  );
};
