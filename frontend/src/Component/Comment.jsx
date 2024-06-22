import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ book }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(book)

    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/books/review', // Adjust endpoint URL as per your Django setup
        {
          book: book.id,
        //   user: userId, // Assuming you pass userId from props or get it from localStorage
          rating: rating,
          comment: comment,
          created_by: localStorage.getItem('user'), // Example; adjust as needed
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Review submitted:', response.data);
      // Optionally, update UI or show success message
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
