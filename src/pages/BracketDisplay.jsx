import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContexts';

const BracketDisplay = () => {
  const { bracketId } = useParams();
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWinners, setSelectedWinners] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchBracket = async () => {
      if (!bracketId || !user?.email) return;
      try {
        const docRef = doc(db, 'brackets', bracketId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().email === user.email) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setBracket(data);
          setSelectedWinners(data.winners || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBracket();
  }, [bracketId, user]);

  const handleWinnerSelect = async (round, matchup, team) => {
    if (!team) return;           // guard against null/TBD
    const key = `${round}-${matchup}`;
    const newW = { ...selectedWinners, [key]: team };
    setSelectedWinners(newW);
    try {
      const ref = doc(db, 'brackets', bracketId);
      await updateDoc(ref, { winners: newW });
    } catch (err) {
      console.error(err);
    }
  };

  const Matchup = ({ round, matchup, teams }) => {
    const [team1, team2] = teams;
    const current = selectedWinners[`${round}-${matchup}`];

    // helper to render one team slot
    const TeamBox = (team, idx) => {
      const isWinner = current?.name === team?.name;
      const isTBD    = !team;
      return (
        <div
          className={`relative p-2 rounded-lg transition-all duration-200 mb-1
            ${isWinner ? 'ring-2 ring-blue-500 scale-105' : ''}
            ${isTBD ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
          style={{
            backgroundColor: bracket.teamBoxColor,
            border: `2px solid ${bracket.lineColor}`,
            minWidth: '180px'
          }}
          onClick={() => handleWinnerSelect(round, matchup, team)}
          key={idx}
        >
          <div className="font-bold text-lg">{team?.name || 'TBD'}</div>
          {team && (
            <div className="text-sm text-gray-600">Seed {team.seed}</div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col items-start">
        {TeamBox(team1, 0)}


        {TeamBox(team2, 1)}
      </div>
    );
  };

  const Round = ({ round }) => {
    const totalTeams   = bracket.teams.length;
    const numMatchups  = Math.ceil(totalTeams / Math.pow(2, round));
    const matchups     = [];

    for (let i = 0; i < numMatchups; i++) {
      let t1, t2;

      if (round === 1) {
        t1 = bracket.teams[2 * i]     || null;
        t2 = bracket.teams[2 * i + 1] || null;
      } else {
        // advance winners in pairs: 0 vs 1, 2 vs 3, …
        t1 = selectedWinners[`${round - 1}-${2 * i}`]     || null;
        t2 = selectedWinners[`${round - 1}-${2 * i + 1}`] || null;
      }

      matchups.push(
        <Matchup
          key={i}
          round={round}
          matchup={i}
          teams={[t1, t2]}
        />
      );
    }

    return (
      <div className="flex flex-col justify-center space-y-6">
        {matchups}
      </div>
    );
  };

  const Champion = () => {
    const finalRound = Math.ceil(Math.log2(bracket.teams.length));
    const champion = selectedWinners[`${finalRound}-0`];

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-700 text-lg">
            Champion
          </h3>
        </div>
        {champion ? (
          <div
            className="p-4 rounded-lg text-center"
            style={{
              backgroundColor: bracket.teamBoxColor,
              border: `2px solid ${bracket.lineColor}`,
              minWidth: '200px'
            }}
          >
            <div className="font-bold text-2xl mb-2">{champion.name}</div>
            <div className="text-lg text-gray-600">Seed {champion.seed}</div>
          </div>
        ) : (
          <div
            className="p-4 rounded-lg text-center opacity-50"
            style={{
              backgroundColor: bracket.teamBoxColor,
              border: `2px solid ${bracket.lineColor}`,
              minWidth: '200px'
            }}
          >
            <div className="font-bold text-2xl">TBD</div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading…</div>
      </div>
    );
  }
  if (!bracket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Bracket not found</div>
      </div>
    );
  }

  const numRounds = Math.ceil(Math.log2(bracket.teams.length));

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: bracket.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            {bracket.bracketName}
          </h1>
          <p className="text-gray-600">
            Click on a team to advance it.
          </p>
        </div>

        <div className="flex justify-center space-x-12 overflow-x-auto p-4">
          {Array.from({ length: numRounds }, (_, i) => i + 1).map(round => (
            <div key={round} className="flex-shrink-0">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-700 text-lg">
                  {round === numRounds
                    ? 'Championship'
                    : `Round ${round}`}
                </h3>
              </div>
              <Round round={round} />
            </div>
          ))}
          <div className="flex-shrink-0">
            <Champion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketDisplay;
