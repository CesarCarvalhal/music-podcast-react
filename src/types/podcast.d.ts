export interface Podcast {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:image': { label: string }[];
  'im:name': { label: string };
  'im:artist': { label: string };
  title: { label: string };
  summary: { label: string };
}

export interface Episode {
  trackId: number;
  trackName: string;
  description: string;
  previewUrl: string;
  releaseDate?: string;
  trackTimeMillis?: number;
}

export interface UseFetchEpisodesResult {
  episodes: Episode[];
  isLoading: boolean;
  hasError: boolean;
  error: string | null;
}

export interface PodcastFetchResponse {
  feed: {
    entry: Podcast[];
  };
}

export interface SearchPodcastProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}