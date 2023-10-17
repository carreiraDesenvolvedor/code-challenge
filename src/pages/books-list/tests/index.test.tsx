import React from 'react';
import BooksListPage from '..';
import {
  render,
  screen,
} from '../../../test-utils/contexts/books-provider-test';

describe('book list test initial stage', () => {
  test('is initial stage values being rendered correctly', async () => {

    render(
      <BooksListPage />
    );

    const counterTitle = screen.getByTestId('counter-title');
    expect(counterTitle).toHaveTextContent('0(0 selected)');

  });

});