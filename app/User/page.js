"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SubmitJoke() {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [approvedJokes, setApprovedJokes] = useState([]);
  const router = useRouter();

  // Fetch a random approved joke
  const fetchRandomApprovedJoke = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/deliverJokes');
      if (!response.ok) throw new Error('Failed to fetch jokes');
      const data = await response.json();
      
      const approvedJokes = data.filter(joke => joke.status === 'approved');
      if (approvedJokes.length > 0) {
        const randomJoke = approvedJokes[Math.floor(Math.random() * approvedJokes.length)];
        setApprovedJokes([randomJoke]);
      } else {
        setApprovedJokes([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRandomApprovedJoke();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/deliverJokes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit joke');
      }

      setMessage('Joke submitted successfully!');
      setType('');
      setContent('');
      fetchRandomApprovedJoke();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  // login page
  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 relative">
      
      {/* Login Button */}
      <button
        onClick={handleLoginRedirect}
        className="absolute top-6 right-6 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        Login
      </button>

      <div className="flex justify-center gap-16 max-w-6xl mx-auto">
        
        {/* Submit Joke Tile */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit a Joke</h1>
          
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Joke Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-800 text-gray-800"
                placeholder="Enter joke type (e.g., Knock-knock)"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Joke Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 text-gray-800"
                placeholder="Enter the joke content"
                rows={4}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-300"
            >
              Submit Joke
            </button>
          </form>
        </div>

        {/* Random Approved Joke Tile */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Random Joke!</h2>
          
          {approvedJokes.length > 0 ? (
            <ul className="space-y-4">
              {approvedJokes.map((joke, index) => (
                <li key={joke._id || index} className="border-b pb-4">
                  <p className="text-gray-700"><strong>Type:</strong> {joke.type}</p>
                  <p className="text-gray-600"><strong>Content:</strong> {joke.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No approved jokes available.</p>
          )}

          <button
            onClick={fetchRandomApprovedJoke}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-300"
          >
            View Another Joke
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitJoke;
