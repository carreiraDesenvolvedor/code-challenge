import { render, screen } from '@testing-library/react';
import InfiniteScroolBookItem from '..';

describe('test book item', () => {
  test('is book item being rendered correctly for a book with 1 author', async () => {
    render(
      <InfiniteScroolBookItem
        item={{
          id: 1,
          title: 'Test Book',
          authors: [{ name: 'Author 1' }],
          formats: {
            'image/jpeg': 'aa',
          },
        }}
      />,
    );

    //find images
    const bookImage = screen.getByRole('img', {
      name: /book image$/i,
    });
    expect(bookImage).toBeInTheDocument();

    const bookTitle = screen.getByRole('heading', {
      name: 'book title',
    });
    expect(bookTitle).toBeInTheDocument();

    const bookAuthors = screen.getByText('Author 1');
    expect(bookAuthors).toBeInTheDocument();
  });

  test('is book item being rendered correctly for a book with multiple authors', async () => {
    render(
      <InfiniteScroolBookItem
        item={{
          id: 1,
          title: 'Test Book',
          authors: [
            { name: 'Author 1' },
            { name: 'Author 2' },
          ],
          formats: {
            'image/jpeg': 'aa',
          },
        }}
      />,
    );

    //find images
    const bookImage = screen.getByRole('img', {
      name: /book image$/i,
    });
    expect(bookImage).toBeInTheDocument();

    const bookTitle = screen.getByRole('heading', {
      name: 'book title',
    });
    expect(bookTitle).toBeInTheDocument();

    const bookAuthors = screen.getByText(
      'Author 1, Author 2',
    );
    expect(bookAuthors).toBeInTheDocument();
  });
});
