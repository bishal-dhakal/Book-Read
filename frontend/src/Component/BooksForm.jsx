import React , { useState } from  'react';
import axios from 'axios'

const BookForm = () => {
    const [ formData, setFormData ] = useState({
        title: '',
        author: localStorage.getItem('user') || '',
        published_date: '',
        isbn: '',
        summary: '',
      });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/books/create', formData);
          console.log('Book successfully created:', response.data);
        } catch (error) {
          console.error('Error creating book:', error);
        }
      };

      return (
        <div>
          <h2>Add a New Book</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
              className = "border border-gray-300  rounded-md"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input
              className = "border border-gray-300  rounded-md"
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                disabled // Prevent user from changing this field
                required
              />
            </div>
            <div>
              <label htmlFor="published_date">Published Date:</label>
              <input
              
                type="date"
                id="published_date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="isbn">ISBN:</label>
              <input
              className = "border border-gray-300  rounded-md"
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="summary">Summary:</label>
              <textarea
              className = "border border-gray-300  rounded-md"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default BookForm;