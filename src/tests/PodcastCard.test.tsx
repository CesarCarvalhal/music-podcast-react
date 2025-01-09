import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Podcast } from '../types/podcast';
import { PodcastCard } from '../podcast/components/PodcastCard';
import '@testing-library/jest-dom';


const mockPodcast: Podcast = {
  id: {
    attributes: {
      'im:id': '123',
    },
  },
  'im:image': [{ label: 'image_url' }, { label: 'image_url_2' }, { label: 'image_url_3' }],
  'im:name': { label: 'Título del Podcast' },
  'im:artist': { label: 'Autor del Podcast' },
  title: { label: 'Título del Podcast' },
  summary: { label: 'Resumen del podcast' },
};

describe('PodcastCard', () => {
  test('muestra la información del podcast correctamente', () => {
    render(
      <Router>
        <PodcastCard podcast={mockPodcast} />
      </Router>
    );

    expect(screen.getByText('Título del Podcast')).toBeInTheDocument();

    expect(screen.getByText('Autor: Autor del Podcast')).toBeInTheDocument();

    const image = screen.getByAltText('Título del Podcast');
    expect(image).toHaveAttribute('src', 'image_url_3');
  });

  test('navega a la página correcta del podcast al hacer clic', () => {
    render(
      <Router>
        <PodcastCard podcast={mockPodcast} />
      </Router>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/podcast/123');
  });
});
