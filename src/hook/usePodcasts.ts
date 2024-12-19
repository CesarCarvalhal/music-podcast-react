import { useState, useEffect } from 'react';

interface Podcast {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:image': { label: string }[];
  'im:name': { label: string };
  'im:artist': { label: string };
}

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        // Accedemos a la URL desde el archivo .env
        const response = await fetch(import.meta.env.VITE_PODCAST_API_URL);
        const data = await response.json();
        setPodcasts(data.feed.entry);
        setLoading(false);
      } catch {
        setError('Error al cargar los podcasts');
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, loading, error };
};
