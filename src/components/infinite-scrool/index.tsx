import React, {
  FC,
  ReactElement,
  useRef
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
  const bottomList = useRef(null);

  React.useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchData();
      },
      { threshold: 1 }
    );
    
    if (bottomList.current) {
      observer.observe(bottomList.current);
    }

    return () => observer.disconnect();
  }, [request.page]);

  return (
    <div className="infinite-scroll-container">
      <div>
        <div>{getElementByItemType({ itemType, list })}</div>
        <div ref={bottomList}></div>
      </div>
      <Loading enabled={isLoading} message={loadingMessage} />
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
