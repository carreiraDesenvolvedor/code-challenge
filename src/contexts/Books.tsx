import {
  Context,
  FC,
  createContext,
  useState,
} from 'react';
import React, { ReactNode } from 'react';
import {
  IApiBookItem,
  apiBooksListRequest,
} from '../api/books/list';

interface IBooksContextRequest {
  page: number;
  isLoading: boolean;
  list: IApiBookItem[];
}
interface IBooksContextValues {
  request: IBooksContextRequest;
  selectedBooks: number[];
}

export interface IBooksContext {
  values: IBooksContextValues;
  setRequest: (request: IBooksContextRequest) => void;
  setSelectedBooks: (books: number[]) => void;
  fetchData: () => void;
}
interface IBooksProvider {
  children: ReactNode;
}

export const BookContext: Context<IBooksContext | null> =
  createContext<IBooksContext | null>(null);

const emptyValues: IBooksContextValues = {
  request: {
    page: 1,
    isLoading: false,
    list: [],
  },
  selectedBooks: [],
};

const BooksProvider: FC<IBooksProvider> = ({
  children,
}) => {
  const [booksValues, setBooksValues] =
    useState<IBooksContextValues>(emptyValues);

  const setRequest = (request: IBooksContextRequest) => {
    setBooksValues({ ...booksValues, request });
  };

  const booksContextValues: IBooksContext = {
    values: booksValues,
    setRequest: setRequest,
    setSelectedBooks: (selectedBooks: number[]) => {
      setBooksValues({ ...booksValues, selectedBooks });
    },
    fetchData: () => {
      if (booksValues.request.isLoading) return false;
      console.log(booksValues.request);
      setRequest({
        ...booksValues.request,
        isLoading: true,
      });

      apiBooksListRequest({
        page: booksValues.request.page,
        onSuccess: (response) => {
          setRequest({
            isLoading: false,
            list: [
              ...booksValues.request.list,
              ...response.results,
            ],
            page: booksValues.request.page + 1,
          });
        },
        onError: (error) => {
          console.log(error);
        },
      });
    },
  };

  return (
    <BookContext.Provider value={booksContextValues}>
      {children}
    </BookContext.Provider>
  );
};

export default BooksProvider;
