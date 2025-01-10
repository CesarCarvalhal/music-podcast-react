import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { PodcastList } from '../podcast/components/PodcastList';
import { usePodcast } from '../hooks/usePodcast';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../hooks/usePodcast', () => ({
    usePodcast: jest.fn(),
}));

describe('PodcastList', () => {
    const mockPodcasts = [
        {
            "im:name": { "label": "The Joe Budden Podcast" },
            "im:image": [
                { "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png" },
                { "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png" },
                { "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png" }
            ],
            "summary": { "label": "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends." },
            "im:artist": { "label": "The Joe Budden Network" },
            "title": { "label": "The Joe Budden Podcast - The Joe Budden Network" },
            "id": { "label": "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2", "attributes": { "im:id": "1535809341" } }
        },
        {
            "im:name": { "label": "Podcast 2" },
            "im:image": [
                { "label": "https://example.com/image2.jpg" },
                { "label": "https://example.com/image2_2.jpg" },
                { "label": "https://example.com/image2_3.jpg" }
            ],
            "summary": { "label": "Summary of podcast 2" },
            "im:artist": { "label": "Author 2" },
            "title": { "label": "Podcast 2 Title" },
            "id": { "label": "https://example.com/podcast2", "attributes": { "im:id": "2" } }
        },
    ];

    beforeEach(() => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: { feed: { entry: mockPodcasts } },
            isLoading: false,
            hasError: false,
            errorMessage: '',
        });
    });

    test('muestra varias cards correctamente', async () => {
        render(
            <MemoryRouter>
                <PodcastList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('listitem')).toHaveLength(mockPodcasts.length);
        });

        mockPodcasts.forEach((podcast) => {
            expect(screen.getByText(podcast['im:name'].label)).toBeInTheDocument();
            expect(screen.getByText(`Autor: ${podcast['im:artist'].label}`)).toBeInTheDocument();
        });
    });

    test('muestra loading mientras carga los podcasts', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            hasError: false,
            errorMessage: '',
        });

        render(
            <MemoryRouter>
                <PodcastList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        });
    });

    test('muestra mensaje de error si hay un fallo al cargar los podcasts', async () => {
        (usePodcast as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            hasError: true,
            errorMessage: 'Hubo un problema al cargar los podcasts',
        });

        render(
            <MemoryRouter>
                <PodcastList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Hubo un problema al cargar los podcasts/)).toBeInTheDocument();
        });
    });

    test('filtra la lista de podcasts al escribir en el input de búsqueda', async () => {
        render(
            <MemoryRouter>
                <PodcastList />
            </MemoryRouter>
        );
    
        expect(screen.getAllByRole('listitem')).toHaveLength(mockPodcasts.length);
    
        fireEvent.change(screen.getByPlaceholderText(/Buscar podcasts/i), {
            target: { value: 'Joe' },
        });
    
        await waitFor(() => {
            const listItems = screen.getAllByRole('listitem');
            expect(listItems).toHaveLength(1);
            expect(screen.getByText(/The Joe Budden Podcast/i)).toBeInTheDocument();
        });
    
        expect(screen.queryByText(/Podcast 2/i)).not.toBeInTheDocument();
    
        fireEvent.change(screen.getByPlaceholderText(/Buscar podcasts/i), {
            target: { value: 'asdas' },
        });
    
        await waitFor(() => {
            expect(screen.queryByRole('listitem')).toBeNull();
            expect(screen.getByText(/No se encontraron podcasts/)).toBeInTheDocument();
        });
    });

});
