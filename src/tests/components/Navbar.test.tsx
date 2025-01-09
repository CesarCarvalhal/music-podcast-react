import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../../ui/components/Navbar';

describe('Navbar', () => {
  const createQueryClient = (isFetching: boolean) => {
    const queryClient = new QueryClient();
    queryClient.isFetching = () => (isFetching ? 1 : 0);
    return queryClient;
  };

  it('debe renderizar el texto "Podcaster"', () => {
    const queryClient = createQueryClient(false);

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Podcaster')).toBeInTheDocument();
  });

  it('debe mostrar el spinner cuando hay solicitudes en curso', () => {
    const queryClient = createQueryClient(true);
  
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </QueryClientProvider>
    );
  
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
  

  it('no debe mostrar el spinner cuando no hay solicitudes en curso', () => {
    const queryClient = createQueryClient(false);

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
