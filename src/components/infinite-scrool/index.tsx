import React, {
  FC,
  ReactElement,
  useRef,
  useEffect,
} from 'react';
import { IApiBookItem } from '../../api/books/list';
import InfiniteScroolBookItem from './items/book';
import Loading from '../loading';
import './style.css';
import { useContext } from 'react';
import {
  BookContext,
  IBooksContext,
} from '../../contexts/Books';
export enum InfiniteScrollItemType {
  book = 'book',
}

interface IItem {
  itemType: InfiniteScrollItemType;
  list: IApiBookItem[];
}

interface IInfiniteScroll extends IItem {
  isLoading: boolean;
  loadingMessage: string;
}

const InfiteScroll: FC<IInfiniteScroll> = ({
  itemType,
  isLoading,
  list,
  loadingMessage,
}): ReactElement => {
  const {
    fetchData,
    values: { request },
  } = useContext(BookContext) as IBooksContext;
  const observerTarget = useRef(null);

  console.log(request.isLoading);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, request.page]);

  return (
    <div className="infinite-scroll-container">
      <div>{getElementByItemType({ itemType, list })}</div>
      <Loading enabled={true} message={loadingMessage} />

      <div ref={observerTarget}></div>
    </div>
  );
};

const getElementByItemType = ({
  itemType,
  list,
}: IItem): ReactElement | ReactElement[] => {
  switch (itemType) {
    case InfiniteScrollItemType.book:
      return list.map((item) => (
        <InfiniteScroolBookItem key={item.id} item={item} />
      ));
    default:
      return <></>;
  }
};

export default InfiteScroll;
