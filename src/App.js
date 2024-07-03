import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MetadataTable from './MetadataTable';
import BookPage from './BookPage';
import AuthorPage from './AuthorPage';
import Layout from './Layout';
import About from './About';

function App() {
  return (
    <Router>
      <Layout>
        <div className="container">
          <div className="main">
            <Routes>
              <Route path="/" element={<MetadataTable />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path="/author/:id" element={<AuthorPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>

      </Layout>
    </Router>
  );
}

export default App;