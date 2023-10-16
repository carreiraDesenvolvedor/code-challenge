import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import BooksSelectionProvider from "../../contexts/BooksSelection";

const renderWithContext = (element: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
    return render(element, {wrapper: BooksSelectionProvider, ...options} );
}

//export everything
export * from '@testing-library/react'

//override render method to have context
export {renderWithContext as render};