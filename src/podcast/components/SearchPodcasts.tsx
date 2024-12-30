import { SearchPodcastProps } from '../../types/podcast';
import './styles.scss';


export const SearchPodcasts: React.FC<SearchPodcastProps> = ({ searchTerm, onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="search-podcasts">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar podcasts..."
        className="search-input" 
      />
    </div>
  );
};

