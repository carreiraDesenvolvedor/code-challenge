import React, { FC, ReactElement } from 'react';
import InfiteScroll, {
  InfiniteScrollItemType,
} from '../../components/infinite-scrool';
import './style.css';
import { useContext } from 'react';
import {
  BookContext,
  IBooksContext,
} from '../../contexts/Books';

const BooksListPage: FC = (): ReactElement => {
  const {
    values: { request },
  } = useContext(BookContext) as IBooksContext;
  return (
    <section
      className="book-list-container"
      aria-label="Books list"
    >
      <div className="book-list-container-header">
        <h1>Books</h1>
      </div>
      <div className="book-list-container-list">
        <InfiteScroll
          itemType={InfiniteScrollItemType.book}
          isLoading={request.isLoading}
          list={request.list}
          loadingMessage="Fetching books..."
        />
      </div>
    </section>
  );
};

export default BooksListPage;
