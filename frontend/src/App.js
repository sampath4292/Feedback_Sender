import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [isSessionValid, setIsSessionValid] = useState(false);

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate session ID with backend
    setIsSessionValid(true); // Placeholder for now
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!isSessionValid ? (
          <form onSubmit={handleSessionSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Enter Session ID</h1>
            <input
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Session ID"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Continue
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Feedback Form</h2>
            <p className="mb-4">Session ID: <span className="font-mono">{sessionId || 'REACT2025'}</span></p>
            <FeedbackForm sessionId={sessionId || 'Faculty 1'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
