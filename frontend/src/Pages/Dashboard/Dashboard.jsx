import React from 'react';
import BookForms from '../../Component/BooksForm'
import BooksByUser from '../../Component/ListBooks';
import { useAuth } from '../../Auth/AuthContext';

const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h2>Home</h2>
      <BookForms/>
      <br/>
      <BooksByUser/>
    </div>
  );
};

export default Home;
