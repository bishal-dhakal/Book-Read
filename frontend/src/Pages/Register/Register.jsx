import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
});
const navigate = useNavigate();

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
      [name]: value,
    })
}

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword){
        setError('Passwords do not match');
        return
    }

    try{
        const response = await axios.post('http://127.0.0.1:8000/auth/register',{
            username: formData.username,
            email: formData.email,
            password: formData.password,
            password2:formData.confirmPassword
        });
        setSuccess('signup Successful');
        setError('');
        console.log(response.data);
        navigate('/login')
    }catch(error){
        setError('Signup failed');
        setSuccess('');
        console.error(error);
    }
}

const [error, setError] = useState('')
const [success, setSuccess] = useState('')

  return (
    <>
    <h2>Register Here!</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>{success}</p>}
    <form onSubmit={handleSubmit}>
    <div>
        <label>Username:</label>
        <input
            className = "border border-gray-300  rounded-md"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
    </div>
    <div>
          <label>Email:</label>
          <input
          className = "border border-gray-300  rounded-md"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
          className = "border border-gray-300  rounded-md"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
          className = "border border-gray-300  rounded-md"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Signup</button>

    </form>
   
    </>
  );
};

export default Register;
