import React from 'react';
import { fireEvent, render, screen } from '../../../../../test-utils/contexts/books-selection-provider-test';
import InfiniteScroolBookItem from '..';

describe('test book render', () => {
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
      />
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
      />
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

describe('test book context selection', () => {
  test('is book selection started unchecked and checking after click', async () => {
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
      />
    );

    //find images
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).not.toBeChecked();

    fireEvent.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
    
  });

});
