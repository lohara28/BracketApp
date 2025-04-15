import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear any previous error
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', auth.currentUser);  // Log the current user after login
      navigate('/home');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4">Log In</h2>

      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}

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
