import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const BracketForm = () => {
  const [bracketName, setBracketName] = useState('');
  const [bracketSize, setBracketSize] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [lineColor, setLineColor] = useState('#000000');
  const [teamBoxColor, setTeamBoxColor] = useState('#cccccc');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [teams, setTeams] = useState([{ name: '', seed: '' }]);

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
    if (
      !bracketName ||
      !bracketSize ||
      !backgroundColor ||
      !lineColor ||
      !teamBoxColor ||
      !firstName ||
      !lastName ||
      !email
    ) {
      return false;
    }
    if (teams.length === 0) return false;
    for (let team of teams) {
      if (!team.name || !team.seed) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const formData = {
        bracketName,
        bracketSize: parseInt(bracketSize),
        backgroundColor,
        lineColor,
        teamBoxColor,
        firstName,
        lastName,
        email,
        teams
      };
  
      try {
        await addDoc(collection(db, 'brackets'), formData);
        alert('Bracket submitted successfully!');
        // Optionally, reset the form here
        setBracketName('');
        setBracketSize('');
        setBackgroundColor('#ffffff');
        setLineColor('#000000');
        setTeamBoxColor('#cccccc');
        setFirstName('');
        setLastName('');
        setEmail('');
        setTeams([{ name: '', seed: '' }]);
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
        {/* Line 1: Bracket Name */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bracket-name">
            Bracket Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="bracket-name"
            type="text"
            placeholder="Bracket"
            value={bracketName}
            onChange={(e) => setBracketName(e.target.value)}
          />
        </div>

        {/* Line 2: Size of Bracket */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bracket-size">
            Size of Bracket (Number of Teams)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="bracket-size"
            type="number"
            placeholder="e.g., 64"
            value={bracketSize}
            onChange={(e) => setBracketSize(e.target.value)}
          />
        </div>

        {/* Line 3: Background Color for the bracket creation screen */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="background-color">
            Background Color for Bracket Creation Screen
          </label>
          <input
            className="appearance-none block w-full h-10 bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="background-color"
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>

        {/* Line 4: Color of lines between teams */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="line-color">
            Color of Lines Between Teams
          </label>
          <input
            className="appearance-none block w-full h-10 bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="line-color"
            type="color"
            value={lineColor}
            onChange={(e) => setLineColor(e.target.value)}
          />
        </div>

        {/* Line 5: Color of Team Boxes */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="team-box-color">
            Color of Team Boxes
          </label>
          <input
            className="appearance-none block w-full h-10 bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="team-box-color"
            type="color"
            value={teamBoxColor}
            onChange={(e) => setTeamBoxColor(e.target.value)}
          />
        </div>

        {/* Line 6: Name (first and last on the same line) */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="first-name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="last-name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Line 7: Email Address */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Line 9: Add teams and their seeds */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Teams and Their Seeds
          </label>
          {teams.map((team, index) => (
            <div key={index} className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-2/3 px-3">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Team Name"
                  value={team.name}
                  onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="Seed"
                  value={team.seed}
                  onChange={(e) => handleTeamChange(index, 'seed', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTeam}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Team
          </button>
        </div>

        {/* Line 10: Submit Button (disabled until all required fields are filled) */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`${
              isFormValid() ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BracketForm;
