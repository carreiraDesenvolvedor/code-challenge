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
import { BookSelectionContext, IBooksSelectionContext } from '../../contexts/BooksSelection';

const BooksListPage: FC = (): ReactElement => {
  const {
    values: { request },
  } = useContext(BookContext) as IBooksContext;

  const {
    getTotal: getTotalBooksSelected,
    clearSelection: clearBooksSelected
  } = useContext(BookSelectionContext) as IBooksSelectionContext;

  return (
    <section
      className="book-list-container"
      aria-label="Books list"
    >
      <div className="book-list-container-header">
        <h1>Books</h1>
      </div>
      <div className='book-list-container-counter'>
        <h3>{request.list.length}({getTotalBooksSelected()} selected)</h3>
        <div>
          <button disabled={getTotalBooksSelected() === 0} onClick={()=>clearBooksSelected()}>Clear Selection</button>
        </div>
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
