import React, {
  FC,
  ReactElement,
  useRef
} from 'react';
import { IApiBookItem } from '../../api/books/list';
import InfiniteScroolBookItem from './items/book';
import Loading from '../loading';
import './style.css';
export enum InfiniteScrollItemType {
  book = 'book',
}

interface IItem {
  itemType: InfiniteScrollItemType;
  list: IApiBookItem[];
}

interface IInfiniteScroll extends IItem {
  fetchData: () => void;
  isLoading: boolean;
  loadingMessage: string;
  currentPage: number;
}

const InfiteScroll: FC<IInfiniteScroll> = ({
  itemType,
  isLoading,
  list,
  loadingMessage,
  fetchData,
  currentPage
}): ReactElement => {
  
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
  }, [currentPage]);

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
