import {
  Context,
  FC,
  createContext,
  useState,
} from 'react';
import React, { ReactNode } from 'react';
import {
  IApiBookItem,
} from '../api/books/list';

interface IStateRequest {
  page: number;
  isLoading: boolean;
  list: IApiBookItem[];
}
interface IState {
  request: IStateRequest;
}

export interface IBooksContext {
  values: IState;
  setSuccessRequest: (list: IApiBookItem[]) => void;
  setLoading: (isLoading: boolean) => void;
}
interface IProvider {
  children: ReactNode;
}

export const BookContext: Context<IBooksContext | null> =
  createContext<IBooksContext | null>(null);

const emptyStateValues: IState = {
  request: {
    page: 1,
    isLoading: false,
    list: [],
  },
};

const BooksProvider: FC<IProvider> = ({
  children,
}) => {
  const [state, setState] =
    useState<IState>(emptyStateValues);

  const contextValue: IBooksContext = {
    values: state,
    setSuccessRequest: (newItems: IApiBookItem[]) => {
      setState({
        ...state,
        request: {
          isLoading: false,
          list: [
            ...state.request.list,
            ...newItems,
          ],
          page: state.request.page + 1,
      }
      });
    },
    setLoading: (isLoading: boolean) => setState({...state, request: {...state.request, isLoading}})
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export default BooksProvider;
