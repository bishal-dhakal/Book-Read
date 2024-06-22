import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from '../Component/Comment';

const BookDetail = ({}) => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/books/${id}`, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        });

        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div>
      <h2>Book Detail</h2>
      
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p> 
      <p><strong>isbn:</strong> {book.isbn}</p> 
      <p><strong>Published Date:</strong> {book.published_date}</p> 
      <p><strong>summary:</strong> {book.summary}</p> 

      <ReviewForm book = {book}/>
      <div>
      <h3>Reviews</h3><br/>
      <ul>
        {book.reviews && book.reviews.map(review => (
          <li key = {review.id}>
             <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <p><strong>By:</strong> {review.created_by}</p>
            <p><strong>At:</strong> {new Date(review.created_at).toLocaleString()}</p><br/>
          </li> 
        ))}
      </ul>
      </div>
    </div>
  );
};

export default BookDetail;
