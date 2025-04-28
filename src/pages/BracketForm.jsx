import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContexts';

const BracketForm = () => {
  const [bracketName, setBracketName] = useState('');
  const [bracketSize, setBracketSize] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [lineColor, setLineColor] = useState('#000000');
  const [teamBoxColor, setTeamBoxColor] = useState('#cccccc');
  const [teams, setTeams] = useState([{ name: '', seed: '' }]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Adds a new empty team entry.
  const handleAddTeam = () => {
    setTeams([...teams, { name: '', seed: '' }]);
  };

  // Updates a specific team entry.
  const handleTeamChange = (index, field, value) => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, [field]: value } : team
    );
    setTeams(updatedTeams);
  };

  // Simple form validation: all fields must have a value and each team must have a name and seed.
  const isFormValid = () => {
    if (!bracketName || !bracketSize) return false;
    if (teams.length === 0) return false;
    for (let team of teams) {
      if (!team.name || !team.seed) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid() && user) {
      const formData = {
        email: user.email,
        bracketName,
        bracketSize: parseInt(bracketSize),
        backgroundColor,
        lineColor,
        teamBoxColor,
        teams,
        createdAt: new Date()
      };
  
      try {
        console.log('Saving bracket with data:', formData); // Debug log
        await addDoc(collection(db, 'brackets'), formData);
        navigate('/my-brackets');
      } catch (error) {
        console.error('Error saving bracket to Firestore:', error);
        alert('There was an error submitting your bracket. Please try again.');
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
        {/* Bracket Name */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bracket-name">
            Bracket Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="bracket-name"
            type="text"
            placeholder="Bracket Name"
            value={bracketName}
            onChange={(e) => setBracketName(e.target.value)}
            required
          />
        </div>

        {/* Bracket Size */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bracket-size">
            Bracket Size
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="bracket-size"
            type="number"
            placeholder="Number of teams"
            value={bracketSize}
            onChange={(e) => setBracketSize(e.target.value)}
            required
          />
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Line Color
            </label>
            <input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Team Box Color
            </label>
            <input
              type="color"
              value={teamBoxColor}
              onChange={(e) => setTeamBoxColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>

        {/* Teams */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Teams
          </label>
          {teams.map((team, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Team Name"
                value={team.name}
                onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                required
              />
              <input
                className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="Seed"
                value={team.seed}
                onChange={(e) => handleTeamChange(index, 'seed', e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTeam}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Team
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`${
              isFormValid() ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Create Bracket
          </button>
        </div>
      </form>
    </div>
  );
};

export default BracketForm;
