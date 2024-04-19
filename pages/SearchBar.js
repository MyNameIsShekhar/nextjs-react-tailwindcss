// components/SearchBar.js

import { useState } from 'react';
import ResultCard from './ResultCard';

function SearchBar({ fetchedData }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      fetchedData(data); // Pass fetched data to parent component
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          value={url}
          onChange={handleChange}
          placeholder="Paste URL..."
        />
        <button type="submit" disabled={!url || loading}>
          {loading ? 'Loading...' : 'Download'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SearchBar;
