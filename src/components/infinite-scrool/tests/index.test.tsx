import React from 'react';
import {
  render,
  screen,
} from '../../../test-utils/contexts/books-provider-test';
import InfiteScroll, { InfiniteScrollItemType } from '..';

describe('infinite loading test render', () => {
  test('is loading being rendered when isLoading is true', async () => {
    render(
      <InfiteScroll
        currentPage={1}
        fetchData={()=>{
          console.log("fetchData...")
        }}
        itemType={InfiniteScrollItemType.book}
        isLoading={true}
        list={[]}
        loadingMessage="Fetching books..."
      />,
    );

    //find images
    const loadingElement = screen.getByRole('alert', {
      name: 'Fetching books...',
    });
    expect(loadingElement).toBeInTheDocument();

  });

  test('is loading not being rendered when isLoading is false', async () => {
    render(
      <InfiteScroll
        currentPage={1}
        fetchData={()=>{
          console.log("nothing")
        }}
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