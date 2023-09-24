import React from 'react';
import { IApiBookItem } from '../../../../api/books/list';
import './style.css';
interface IInfiniteScroolBookItem {
  item: IApiBookItem;
}

const InfiniteScroolBookItem = ({
  item,
}: IInfiniteScroolBookItem) => {
  return (
    <div className="infinite-scroll-book-item-container">
      <div className="infinite-scroll-book-item-checkbox">
        <input type="checkbox" />
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
