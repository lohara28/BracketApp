import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router';

const BracketList = () => {
  const [brackets, setBrackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrackets = async () => {
      if (!user?.email) return;

      try {
        console.log('Fetching brackets for email:', user.email); // Debug log
        const q = query(
          collection(db, 'brackets'),
          where('email', '==', user.email),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const userBrackets = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched brackets:', userBrackets); // Debug log
        setBrackets(userBrackets);
      } catch (error) {
        console.error('Error fetching brackets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrackets();
  }, [user]);

  const handleBracketClick = (bracketId) => {
    navigate(`/bracket/${bracketId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Brackets</h1>
        
        {brackets.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">You haven't created any brackets yet.</p>
            <button
              onClick={() => navigate('/create')}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Your First Bracket
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brackets.map((bracket) => (
              <div
                key={bracket.id}
                onClick={() => handleBracketClick(bracket.id)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{bracket.bracketName}</h2>
                <p className="text-gray-600 mb-4">
                  {bracket.teams.length} teams
                </p>
                <div className="flex flex-wrap gap-2">
                  {bracket.teams.slice(0, 3).map((team, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {team.name}
                    </span>
                  ))}
                  {bracket.teams.length > 3 && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      +{bracket.teams.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BracketList;
