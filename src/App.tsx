import React from 'react';
import './App.css';
import BooksListPage from './pages/books-list';
import MainLayout from './layouts/main';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <BooksListPage />
      </MainLayout>
    </div>
  );
}

export default App;
