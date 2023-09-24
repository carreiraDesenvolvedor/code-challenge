import {
  Context,
  FC,
  createContext,
  useState,
} from 'react';
import React, { ReactNode } from 'react';
import { IApiBookItem } from '../api/books/list';

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
  values: IBooksContextRequest;
  setRequest: (request: IBooksContextRequest) => void;
  setSelectedBooks: (books: number[]) => void;
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

  const booksContextValues: IBooksContext = {
    values: emptyValues,
    setRequest: (request: IBooksContextRequest) => {
      setBooksValues({ ...booksValues, request });
    },
    setSelectedBooks: (selectedBooks: number[]) => {
      setBooksValues({ ...booksValues, selectedBooks });
    },
  };

  return (
    <BookContext.Provider value={booksContextValues}>
      {children}
    </BookContext.Provider>
  );
};

export default BooksProvider;
