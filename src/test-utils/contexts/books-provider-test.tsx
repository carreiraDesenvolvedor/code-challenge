import React, {ReactNode} from "react";
import { render, RenderOptions } from "@testing-library/react";
import BooksProvider from "../../contexts/Books";
import BooksSelectionProvider from "../../contexts/BooksSelection";

const wrapper = ({children} : {children: ReactNode}) => {
    return (
        <BooksProvider>
            <BooksSelectionProvider>{children}</BooksSelectionProvider>
        </BooksProvider>
    )
}

const renderWithContext = (element: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
    return render(element, {wrapper: wrapper, ...options} );
}

//export everything
export * from '@testing-library/react'

//override render method to have context
export {renderWithContext as render};