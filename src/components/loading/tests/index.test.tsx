import { render, screen } from '@testing-library/react';
import Loading from '..';

describe('test loading', () => {
  test('is loading being rendered correctly when enabled is true', async () => {
    render(<Loading enabled={true} message="Loading" />);

    //find images
    const loading = screen.getByRole('alert', {
      name: 'Loading',
    });
    expect(loading).toBeInTheDocument();
  });

  test('is loading not being rendered correctly when enabled is false', async () => {
    render(<Loading enabled={false} message="Loading" />);

    //find images
    const loading = screen.queryByRole('alert', {
      name: 'Loading',
    });
    expect(loading).toBe(null);
  });
});
