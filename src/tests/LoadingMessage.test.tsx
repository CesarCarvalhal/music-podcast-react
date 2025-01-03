import { render, screen } from '@testing-library/react';
import LoadingMessage from '../podcast/components/LoadingMessage';

describe('LoadingMessage', () => {
  it('debería mostrar el mensaje de carga', () => {
    render(<LoadingMessage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
