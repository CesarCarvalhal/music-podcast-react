import { render, screen, waitFor } from '@testing-library/react';
import { PodcastDetails } from '../../podcast/components/PodcastDetails';
import { usePodcast } from '../../hook/usePodcast';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../hook/usePodcast', () => ({
    usePodcast: jest.fn(),
}));

describe('PodcastDetails', () => {
    const mockPodcastData = {
        feed: {
            entry: [
                {
                    id: {
                        attributes: {
                            'im:id': '123',
                        },
                    },
                    'im:name': {
                        label: 'Mock Podcast',
                    },
                    'im:artist': {
                        label: 'Mock Artist',
                    },
                    'im:image': [
                        { label: '' },
                        { label: '' },
                        { label: 'https://example.com/podcast-image.jpg' },
                    ],
                    summary: {
                        label: 'This is a mock podcast description.',
                    },
                },
            ],
        },
    };

    test('muestra la card de detalles del podcast', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: mockPodcastData,
            isLoading: false,
            hasError: false,
            errorMessage: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123']}>
                <Routes>
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Mock Podcast/)).toBeInTheDocument();
            expect(screen.getByText(/Mock Artist/)).toBeInTheDocument();
            expect(screen.getByText(/This is a mock podcast description./)).toBeInTheDocument();
            expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/podcast-image.jpg');
        }
        );

    });

    test('muestra el mensaje de loading mientras los datos se están cargando', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            hasError: false,
            errorMessage: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123']}>
                <Routes>
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        });
    });

    test('muestra mensaje de error si ocurre un fallo al cargar los datos', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            hasError: true,
            errorMessage: 'Error al obtener el podcast.',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123']}>
                <Routes>
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error: Error al obtener el podcast./)).toBeInTheDocument();
        });
    });

    test('muestra mensaje si el podcast no es encontrado', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            hasError: false,
            errorMessage: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/999']}>
                <Routes>
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Podcast no encontrado/)).toBeInTheDocument();
        });
    });

    test('muestra correctamente los detalles del podcast cuando los datos son válidos', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: mockPodcastData,
            isLoading: false,
            hasError: false,
            errorMessage: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123']}>
                <Routes>
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Mock Podcast/)).toBeInTheDocument();

            expect(screen.getByText(/Mock Artist/)).toBeInTheDocument();

            expect(screen.getByText(/This is a mock podcast description./)).toBeInTheDocument();

            const podcastImage = screen.getByRole('img');
            expect(podcastImage).toBeInTheDocument();
            expect(podcastImage).toHaveAttribute('src', 'https://example.com/podcast-image.jpg');

            const podcastImageLink = screen.getAllByRole('link')[0];
            expect(podcastImageLink).toHaveAttribute('href', '/podcast/123');

            const podcastTextLink = screen.getAllByRole('link')[1];
            expect(podcastTextLink).toHaveAttribute('href', '/podcast/123');
        });
    });

});
