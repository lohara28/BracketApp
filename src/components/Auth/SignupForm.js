import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Optionally store user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        createdAt: new Date()
      });
  
      alert('Account created successfully!');
  
      // Redirect to the home page after successful sign-up
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
      <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
