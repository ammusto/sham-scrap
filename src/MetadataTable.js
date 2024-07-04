import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './MetadataTable.css';
import FileLink from './FileLink';

function MetadataTable() {
  const [metadata, setMetadata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

  useEffect(() => {
    fetch('/metadata.json')
      .then(response => response.json())
      .then(data => {
        const parsedData = data.map(item => ({
          ...item,
          text_id: parseInt(item.text_id, 10),
          date: parseInt(item.date, 10)
        }));
        setMetadata(parsedData);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...metadata];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [metadata, sortConfig]);

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    if (pageCount <= 1) return null;

    const maxVisibleButtons = 3;
    let startPage, endPage;

    if (pageCount <= maxVisibleButtons) {
      startPage = 1;
      endPage = pageCount;
    } else {
      if (currentPage <= Math.floor(maxVisibleButtons / 2) + 1) {
        startPage = 1;
        endPage = maxVisibleButtons;
      } else if (currentPage + Math.floor(maxVisibleButtons / 2) >= pageCount) {
        startPage = pageCount - maxVisibleButtons + 1;
        endPage = pageCount;
      } else {
        startPage = currentPage - Math.floor(maxVisibleButtons / 2);
        endPage = currentPage + Math.floor(maxVisibleButtons / 2);
      }
    }

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return (
      <div className='pagination flex'>
        <div className='pagination-left'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </div>
        <div className='pagination-center'>
          {startPage > 1 && (
            <>
              <button onClick={() => handlePageChange(1)}>1</button>
              <span>...</span>
            </>
          )}
          {pageButtons}
          {endPage < pageCount && (
            <>
              <span>...</span>
              <button onClick={() => handlePageChange(pageCount)}>{pageCount}</button>
            </>
          )}
        </div>
        <div className='pagination-right'>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='search-container'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>
      <table className='metadata-table'>
        <thead>
          <tr>
            {['text_id', 'title', 'author_sh', 'cat', 'date'].map((key) => (
              <th key={key} onClick={() => requestSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig.key === key && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.text_id}>
              <td>
                <Link to={`/book/${item.text_id}`}>{item.text_id}</Link>
              </td>
              <td>
                <Link to={`/book/${item.text_id}`}>{item.title}</Link>
              </td>
              <td>
                <Link to={`/author/${item.author_id}`}>{item.author_sh}</Link>
              </td>
              <td>{item.cat}</td>
              <td>{item.date}</td>
              <td><FileLink textId={item.text_id} text="💾" className="download-link"/></td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
}

export default MetadataTable;