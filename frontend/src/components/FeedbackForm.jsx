import React, { useState } from 'react';

const FeedbackForm = ({ sessionId }) => {
  const [clarity, setClarity] = useState('');
  const [content, setContent] = useState('');
  const [interaction, setInteraction] = useState('');
  const [comments, setComments] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          clarity: Number(clarity),
          content: Number(content),
          interaction: Number(interaction),
          comments,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit feedback');
      setSuccess(true);
      setClarity('');
      setContent('');
      setInteraction('');
      setComments('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Session Feedback</h2>
        <p className="mb-4 text-center text-gray-600">Session ID: <span className="font-mono">{sessionId}</span></p>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">Thank you for your feedback!</div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Clarity <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="1"
              max="5"
              value={clarity}
              onChange={e => setClarity(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Content <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="1"
              max="5"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Interaction <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="1"
              max="5"
              value={interaction}
              onChange={e => setInteraction(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Comments (optional)</label>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your comments..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm; 