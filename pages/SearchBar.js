import React, { useState } from 'react';
import ResultCard from './ResultCard';
import InstaCard from './InstaCard';
import loadingGif from './32e4d4a60395d0e30b61f313a4e7401c.gif';
import { fetchData, urlPatterns } from './apiUtils'; // Import fetchData function and urlPatterns

function SearchBar() {
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [instaResponseData, setInstaResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoadingGif, setShowLoadingGif] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [showInstaCard, setShowInstaCard] = useState(false);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShowLoadingGif(true);

    // Check if URL matches any supported pattern
    if (!urlPatterns.terabox.test(url) && !urlPatterns.instagram.test(url)) {
      setError('Invalid URL format');
      setLoading(false);
      setShowLoadingGif(false);
      return;
    }

    try {
      // Fetch data from the provided URL
      const data = await fetchData(`https://fetch-media-kohl.vercel.app/api?url=${encodeURIComponent(url)}`);
      setResponseData(data);
      setShowResultCard(true);

      // Check if URL matches Instagram pattern
      if (urlPatterns.instagram.test(url)) {
        const instaData = await fetchData('/api/insta');
        setInstaResponseData(instaData);
        setShowInstaCard(true);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setShowLoadingGif(false);
    }
  };

  const handleDownload = (downloadUrl) => {
    window.open(downloadUrl, '_blank');
    setShowLoadingGif(true);
  };

  return (
    <div className="bg-transparent p-4 sm:p-2 pt-20 md:pt-20 z-50">
      <div className="text-center">
        <h1 className="text-white mt-4 font-bold text-2xl">Online Video Fetcher & Saver</h1>
        <form onSubmit={handleSubmit} className="mt-4 max-w-lg mx-auto">
          <div className="text-white">
            <input
              name="search"
              value={url}
              onChange={handleChange}
              placeholder="Paste URL..."
              className="bg-transparent border-gray-400 border h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
            />
          </div>
          <button
            type="submit"
            className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline`}
            disabled={!url || loading}
          >
            {loading ? 'Loading...' : 'Download'}
          </button>
        </form>
        {showLoadingGif && (
          <img
            src={loadingGif}
            alt="loading"
            className={`mt-4 mx-auto ${window.innerWidth > 768 ? 'w-60' : ''}`}
          />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {showResultCard && responseData && (
          <div className="mt-4">
            <ResultCard fileData={responseData} handleDownload={handleDownload} />
          </div>
        )}
        {showInstaCard && instaResponseData && (
          <div className="mt-4">
            <InstaCard instaData={instaResponseData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
