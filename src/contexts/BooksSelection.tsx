import {
  Context,
  FC,
  createContext,
  useState,
} from 'react';

import React, { ReactNode } from 'react';
interface IState {
  selectedBooks: {
    [key : string]: boolean
  }
}

export interface IBooksSelectionContext {
  values: IState;
  handleSelection: (id: number, isChecked: boolean) => void;
  isBookSelected:(id: number) => boolean;
  clearSelection:() => void;
  getTotal:() => number;
}
interface IBooksSelectionProvider {
  children: ReactNode;
}

export const BookSelectionContext: Context<IBooksSelectionContext | null> =
  createContext<IBooksSelectionContext | null>(null);

const emptyStateValues: IState = {
  selectedBooks: {}
};

const BooksSelectionProvider: FC<IBooksSelectionProvider> = ({
  children,
}) => {
  const [state, setState] =
    useState<IState>(emptyStateValues);

  const contextValues: IBooksSelectionContext = {
    values: state,
    handleSelection: (id: number, isChecked: boolean) => {
      const newList = state.selectedBooks;
      if(isChecked){
        newList[id] = true;
      }else if(newList[id]){
        delete newList[id];
      }
      setState({...state, selectedBooks: newList});
    },
    getTotal: () => {
      return Object.keys(state.selectedBooks).length
    },
    clearSelection:() => {
      setState({...state, selectedBooks:{}})
    },
    isBookSelected: (id: number) => state.selectedBooks[id] !== undefined && state.selectedBooks[id],
  };

  return (
    <BookSelectionContext.Provider value={contextValues}>
      {children}
    </BookSelectionContext.Provider>
  );
};

export default BooksSelectionProvider;
