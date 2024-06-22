import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BooksByUser = () => {
  const [booksByUser, setBooksByUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksByUser = async () => {
      try {
          const access_token = localStorage.getItem('access_token'); // Assuming username is stored in localStorage
        const response = await axios.get('http://127.0.0.1:8000/books/list', {
          // Add headers if needed (e.g., authentication token)
    
          headers: {
            'Authorization': `Bearer ${access_token}`,
    
          }
        });
        setBooksByUser(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooksByUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Books by User</h2>
      <br/>
      <ul>
        {booksByUser.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`} style={{ cursor: 'pointer' }}>
            <strong>Title:</strong> {book.title} <br />
            <p>by {book.author}</p> <br />
            </Link>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksByUser;
