import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      
      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full mb-4 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-green-500 text-white p-2 rounded" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
