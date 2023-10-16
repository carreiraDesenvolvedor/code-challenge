import React from 'react';
import { IApiBookItem } from '../../../../api/books/list';
import {  useBooksSelectionProvider } from '../../../../contexts/BooksSelection';
import './style.css';
interface IInfiniteScroolBookItem {
  item: IApiBookItem;
}

const InfiniteScroolBookItem = ({
  item,
}: IInfiniteScroolBookItem) => {
  const {
    handleSelection,
    isBookSelected
  } = useBooksSelectionProvider();
  return (
    <div className="infinite-scroll-book-item-container">
      <div className="infinite-scroll-book-item-checkbox">
        <input 
          type="checkbox" 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleSelection(item.id, event.target.checked);
          }}
          checked={isBookSelected(item.id)}
        />
      </div>
      <div className="infinite-scroll-book-item-img">
        <img
          alt={`${item.title} book image`}
          src={item.formats['image/jpeg']}
        />
      </div>
      <div className="infinite-scroll-book-item-content">
        <h4 aria-label="book title" className="book-title">
          {item.title}
        </h4>
        <span
          aria-label="book authors"
          className="book-authors"
        >
          {buildAuthorsNameString(item)}
        </span>
      </div>
    </div>
  );
};

const buildAuthorsNameString = (item: IApiBookItem) => {
  let authorsNames = '';
  item.authors.map((item) => {
    authorsNames += `${item.name}, `;
  });
  return authorsNames.slice(0, -2);
};

export default InfiniteScroolBookItem;
