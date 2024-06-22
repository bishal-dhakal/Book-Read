import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const Login = () =>{
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault();



    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('user', data.user);
            login()
            navigate('/');
          } else {
            console.error('Login failed');
          }
        };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                className = "border border-gray-300  rounded-md"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                className = "border border-gray-300  rounded-md"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
        );
    };
    
export default Login;