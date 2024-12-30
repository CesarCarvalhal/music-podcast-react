import React, { useState } from 'react';
import { usePodcast } from '../../hook/usePodcast';
import LoadingMessage from './LoadingMessage';
import { PodcastCard } from './PodcastCard';
import { Podcast } from '../../types/podcast';
import { SearchPodcasts } from './SearchPodcasts';
import './styles.scss';



interface PodcastFetchResponse {
  feed: {
    entry: Podcast[];
  };
}

const PODCASTS_URL = import.meta.env.VITE_PODCAST_API_URL;

export const PodcastList: React.FC = () => {

  const { data, isLoading, hasError, errorMessage } = usePodcast<PodcastFetchResponse>(PODCASTS_URL);

  const podcasts = data?.feed?.entry || [];
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPodcasts = podcasts.filter((podcast: Podcast) => {
    const searchLowerCase = searchTerm.toLowerCase();
    const title = podcast.title.label.toLowerCase();
    const author = podcast['im:artist'].label.toLowerCase();
    return title.includes(searchLowerCase) || author.includes(searchLowerCase);
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      {hasError && <div className="error-message">Error: {errorMessage}</div>}

      {isLoading && <LoadingMessage />}

      <div className="search-container">
        <div className="podcast-count">
          {filteredPodcasts.length}
        </div>
        <SearchPodcasts searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {filteredPodcasts.length > 0 ? (
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
