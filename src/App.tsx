import React from 'react';
import './App.css';
import BooksListPage from './pages/books-list';
import MainLayout from './layouts/main';
import BooksProvider from './contexts/Books';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <BooksProvider>
          <BooksListPage />
        </BooksProvider>
      </MainLayout>
    </div>
  );
}

export default App;
