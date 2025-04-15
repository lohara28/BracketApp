import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContexts';

const BracketList = () => {
  const { user } = useAuth();
  console.log('User from context:', user);  // Log the user state here
  const [brackets, setBrackets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrackets = async () => {
      if (!user) return;

      const q = query(collection(db, 'brackets'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const userBrackets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('User brackets:', userBrackets);  // Log the fetched brackets
      setBrackets(userBrackets);
      setLoading(false);
    };

    fetchBrackets();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Brackets</h2>
      {brackets.length > 0 ? (
        <ul className="space-y-2">
          {brackets.map((bracket) => (
            <li key={bracket.id} className="p-4 bg-white rounded shadow">
              {bracket.bracketName}
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any brackets yet.</p>
      )}
    </div>
  );
};

export default BracketList;
