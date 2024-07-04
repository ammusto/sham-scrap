import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function AuthorPage() {
  const [authorData, setAuthorData] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch author data
    fetch(`/author/${id}.json`)
      .then(response => response.json())
      .then(data => setAuthorData(data));

    // Fetch all metadata to get books by this author
    fetch('/metadata.json')
      .then(response => response.json())
      .then(data => {
        setAuthorBooks(data.filter(item => item.author_id.toString() === id));
      });
  }, [id]);

  if (!authorData || authorBooks.length === 0) return <div>Loading...</div>;

  const authorName = authorBooks[0].author_sh;

  return (
    <div>
      <h1 className="center">{authorName}</h1>
      <table className='individual-meta'>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>Author ID</td>
          </tr>
          <tr>
            <td>
              {authorData.author_meta.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </td>
            <td>Author Information</td>
          </tr>
          {authorBooks.length > 0 && (
            <tr>
              <td>
                <ul>
                  {authorBooks.map(book => (
                    <li key={book.text_id}>
                      <Link to={`/book/${book.text_id}`}>{book.title}</Link>
                    </li>
                  ))}
                </ul>
              </td>
              <td>Texts by Author</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='center back-link-div'><Link to="/">Back to Metadata Table</Link>
      </div>
    </div>
  );
}

export default AuthorPage;
