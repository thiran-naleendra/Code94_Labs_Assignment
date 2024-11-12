"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedJoke, setSelectedJoke] = useState(null);
  const [editType, setEditType] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editStatus, setEditStatus] = useState("unmoderated");
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Adjust this based on how you're storing tokens
    router.push("/login"); // Redirect to login page after logout
  };

  // Function to fetch jokes from the API
  const handleViewJokes = async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/moderateJokes/viewJokes');
      if (!response.ok) throw new Error('Failed to fetch jokes');
      const data = await response.json();
      setJokes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to edit a joke
  const handleEditJoke = async (jokeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/moderateJokes/editJokes?id=${jokeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: editType, content: editContent, status: editStatus }),
      });
      if (!response.ok) throw new Error('Failed to edit joke');
      await response.json();
      setSelectedJoke(null);
      setEditType("");
      setEditContent("");
      setEditStatus("unmoderated");
      handleViewJokes();
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to delete a joke
  const handleDeleteJoke = async (jokeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/moderateJokes/deleteJokes?id=${jokeId}&action=reject`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete joke');
      }
      setJokes(jokes.filter((joke) => joke._id !== jokeId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <header className="flex justify-between items-center w-full max-w-5xl p-4 bg-white rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Joke Moderation Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </header>

      <main className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex justify-center mb-6">
          <button
            onClick={handleViewJokes}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View Jokes
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Unmoderated Jokes */}
          <div>
            <h2 className="text-xl text-gray-800 font-semibold mb-4">Unmoderated Jokes</h2>
            {jokes.filter(joke => joke.status === 'unmoderated').length > 0 ? (
              <ul className="space-y-4">
                {jokes.filter(joke => joke.status === 'unmoderated').map((joke, index) => (
                  <li key={joke._id || index} className="border-b pb-4">
                    <p className="text-gray-800 text-sm"><strong>Status:</strong> {joke.status}</p>
                    {selectedJoke === joke._id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          className="border p-2 w-full text-black rounded-md"
                          placeholder="Edit type"
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                        />
                        <textarea
                          className="border p-2 w-full text-black rounded-md"
                          placeholder="Edit content"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <select
                          className="border p-2 w-full text-black rounded-md"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="unmoderated">Unmoderated</option>
                          <option value="approved">Approved</option>
                        </select>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditJoke(joke._id)}
                            className="bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setSelectedJoke(null)}
                            className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-800"><strong>Type:</strong> {joke.type}</p>
                        <p className="text-gray-600"><strong>Content:</strong> {joke.content}</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setSelectedJoke(joke._id);
                              setEditType(joke.type);
                              setEditContent(joke.content);
                              setEditStatus(joke.status);
                            }}
                            className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteJoke(joke._id)}
                            className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No unmoderated jokes available.</p>
            )}
          </div>

          {/* Approved Jokes */}
          <div>
            <h2 className="text-xl text-gray-800 font-semibold mb-4">Approved Jokes</h2>
            {jokes.filter(joke => joke.status === 'approved').length > 0 ? (
              <ul className="space-y-4">
                {jokes.filter(joke => joke.status === 'approved').map((joke, index) => (
                  <li key={joke._id || index} className="border-b pb-4">
                    <p className="text-gray-500 text-sm"><strong>Status:</strong> {joke.status}</p>
                    {selectedJoke === joke._id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          className="border p-2 w-full text-black rounded-md"
                          placeholder="Edit type"
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                        />
                        <textarea
                          className="border p-2 w-full text-black rounded-md"
                          placeholder="Edit content"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <select
                          className="border p-2 w-full text-black rounded-md"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="unmoderated">Unmoderated</option>
                          <option value="approved">Approved</option>
                        </select>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditJoke(joke._id)}
                            className="bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setSelectedJoke(null)}
                            className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-800"><strong>Type:</strong> {joke.type}</p>
                        <p className="text-gray-600"><strong>Content:</strong> {joke.content}</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setSelectedJoke(joke._id);
                              setEditType(joke.type);
                              setEditContent(joke.content);
                              setEditStatus(joke.status);
                            }}
                            className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteJoke(joke._id)}
                            className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No approved jokes available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
