import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../contexts/AuthContexts';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        createdAt: new Date()
      });

      navigate('/home');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

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
      <button 
        className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50" 
        type="submit"
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
