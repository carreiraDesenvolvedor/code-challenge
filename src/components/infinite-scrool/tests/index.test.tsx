import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import InfiteScroll, { InfiniteScrollItemType } from '..';

describe('infinite loading test', () => {
  test('is loading being rendered when isLoading is true', async () => {
    render(
      <InfiteScroll
        itemType={InfiniteScrollItemType.book}
        isLoading={true}
        list={[]}
        loadingMessage="Fetching books..."
      />,
    );

    //find images
    const bookImage = screen.getByRole('alert', {
      name: 'Fetching books...',
    });
    expect(bookImage).toBeInTheDocument();
  });

  test('is loading not being rendered when isLoading is false', async () => {
    render(
      <InfiteScroll
        itemType={InfiniteScrollItemType.book}
        isLoading={false}
        list={[]}
        loadingMessage="Fetching books..."
      />,
    );

    //find images
    const bookImage = screen.queryByRole('alert', {
      name: 'Fetching books...',
    });
    expect(bookImage).toBeNull();
  });
});
