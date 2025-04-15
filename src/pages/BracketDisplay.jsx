import React from 'react';
import { useLocation } from 'react-router';

const BracketDisplay = () => {
    const location = useLocation();
    const { bracket, id } = location.state || {};

    if (!bracket) {
        return <p>No bracket data found.</p>;
    }

    return (
    <div className="p-6" style={{ backgroundColor: bracket.backgroundColor }}>
      <h1 className="text-2xl font-bold mb-4">{bracket.bracketName} (ID: {id})</h1>
      <p><strong>Created by:</strong> {bracket.firstName} {bracket.lastName} ({bracket.email})</p>
      <p><strong>Bracket Size:</strong> {bracket.bracketSize}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Teams:</h2>
        <ul className="space-y-2">
          {bracket.teams.map((team, index) => (
            <li key={index} className="p-2 rounded" style={{ backgroundColor: bracket.teamBoxColor }}>
              <span className="font-medium">{team.name}</span> - Seed {team.seed}
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
}

export default BracketDisplay;