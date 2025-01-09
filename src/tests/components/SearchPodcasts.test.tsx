import { render, screen, fireEvent } from '@testing-library/react';
import { SearchPodcasts } from '../../podcast/components/SearchPodcasts';

describe('SearchPodcasts', () => {
  it('debería renderizar correctamente el input con el valor inicial', () => {
    render(<SearchPodcasts searchTerm="Podcast inicial" onSearchChange={jest.fn()} />);
    
    const input = screen.getByPlaceholderText(/Buscar podcasts.../i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Podcast inicial');
  });

  it('debería llamar a onSearchChange al escribir en el input', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchPodcasts searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const input = screen.getByPlaceholderText(/Buscar podcasts.../i);
    fireEvent.change(input, { target: { value: 'Nueva búsqueda' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('Nueva búsqueda');
  });

});
