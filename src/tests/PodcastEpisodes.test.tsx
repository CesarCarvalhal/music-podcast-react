import { render, screen, waitFor } from '@testing-library/react';
import { PodcastEpisodes } from '../podcast/components/PodcastEpisodes';
import { useEpisodes } from '../hooks/useEpisodes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../hooks/useEpisodes', () => ({
    useEpisodes: jest.fn(),
}));

describe('PodcastEpisodes', () => {
    test('muestra los episodios correctamente', async () => {
        const mockEpisodes = [
            {
                trackId: '1',
                trackName: 'Episode 1',
                releaseDate: '2023-01-01T12:00:00Z',
                trackTimeMillis: 3600000,
            },
            {
                trackId: '2',
                trackName: 'Episode 2',
                releaseDate: '2023-01-02T12:00:00Z',
                trackTimeMillis: 7200000,
            },
        ];

        (useEpisodes as jest.Mock).mockReturnValue({
            episodes: mockEpisodes,
            isLoading: false,
            hasError: false,
            error: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123/episodes']}>
                <Routes>
                    <Route path="/podcast/:podcastId/episodes" element={<PodcastEpisodes />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(`Episodes: ${mockEpisodes.length}`)).toBeInTheDocument();
        });

        mockEpisodes.forEach((episode) => {
            expect(screen.getByText(episode.trackName)).toBeInTheDocument();
            
            const formattedDate = `${new Date(episode.releaseDate).getDate().toString().padStart(2, '0')}/${(new Date(episode.releaseDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(episode.releaseDate).getFullYear()}`;
            expect(screen.getByText(formattedDate)).toBeInTheDocument();

            const durations = screen.getAllByText(/(\d{1,2}):(\d{2}):(\d{2})/);

            expect(durations).toHaveLength(mockEpisodes.length);

            expect(durations[0].textContent).toMatch(/01:00:00$/);
            expect(durations[1].textContent).toMatch(/02:00:00$/);
        });
    });

    test('muestra mensaje cuando no hay episodios', async () => {
        (useEpisodes as jest.Mock).mockReturnValue({
            episodes: [],
            isLoading: false,
            hasError: false,
            error: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123/episodes']}>
                <Routes>
                    <Route path="/podcast/:podcastId/episodes" element={<PodcastEpisodes />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/No hay episodios disponibles/)).toBeInTheDocument();
        });
    });

    test('muestra mensaje de loading mientras carga los episodios', async () => {
        (useEpisodes as jest.Mock).mockReturnValue({
            episodes: [],
            isLoading: true,
            hasError: false,
            error: '',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123/episodes']}>
                <Routes>
                    <Route path="/podcast/:podcastId/episodes" element={<PodcastEpisodes />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        });
    });

    test('muestra mensaje de error si hay un fallo al cargar los episodios', async () => {
        (useEpisodes as jest.Mock).mockReturnValue({
            episodes: [],
            isLoading: false,
            hasError: true,
            error: 'Hubo un problema al cargar los episodios',
        });

        render(
            <MemoryRouter initialEntries={['/podcast/123/episodes']}>
                <Routes>
                    <Route path="/podcast/:podcastId/episodes" element={<PodcastEpisodes />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Hubo un problema al cargar los episodios/)).toBeInTheDocument();
        });
    });
});
