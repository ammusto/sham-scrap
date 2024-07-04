import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FileLink from './FileLink';

function BookPage() {
  const [bookData, setBookData] = useState(null);
  const [bookMeta, setBookMeta] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch book data based on id
    fetch('/metadata.json')
      .then(response => response.json())
      .then(data => setBookData(data.find(item => item.text_id.toString() === id)));

    // Fetch book meta data
    fetch('/book_meta.json')
      .then(response => response.json())
      .then(data => {
        const meta = data.find(item => item.text_id.toString() === id);
        setBookMeta(meta ? meta.book_meta_raw : null);
      });
  }, [id]);

  if (!bookData || !bookMeta) return <div>Loading...</div>;

  const cleanText = (text) => {
    return typeof text === 'string' ? text.replace(/["[\]]/g, '') : text;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderMetaValue = (key, value) => {
    if (key === "author") {
      return <Link to={`/author/${bookData.author_id}`}>{cleanText(value)}</Link>;
    } else if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((subItem, subIndex) => (
            <li key={subIndex}>{cleanText(subItem)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object') {
      return JSON.stringify(value);
    } else {
      return cleanText(value);
    }
  };

  return (
    <div>
      <h1 className='center'>{bookData.title}</h1>
      <table className='individual-meta'>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>Text ID</td>
          </tr>
          {Object.entries(bookMeta).map(([key, value]) => (
            <React.Fragment key={key}>
              <tr>
                <td>{renderMetaValue(key, value)}</td>
                <td>{capitalizeFirstLetter(key)}</td>
              </tr>
              {key === "author" && (
                <tr>
                  <td>{bookData.date}</td>
                  <td>Date</td>
                </tr>
              )}
            </React.Fragment>
          ))}
          <tr>
            <td>{bookData.cat}</td>
            <td>Category</td>
          </tr>
          <tr>
            <td><FileLink textId={id} text="JSON Link" className=""/></td>
            <td>Download</td>
          </tr>
        </tbody>
      </table>
      <div className='center'><Link to="/">Back to Metadata Table</Link></div>
    </div>
  );
}

export default BookPage;
