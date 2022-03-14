import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../RenderWithRouter';

describe('Testando o componente NotFound', () => {
  test('Testando o heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: (/Page requested not found/),
      level: 2,
    });
    expect(title).toBeDefined();
  });
  it('should be a error image', () => {
    renderWithRouter(<NotFound />);
    const imageError = screen.getByAltText(/Pikachu crying because/i);
    expect(imageError).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
