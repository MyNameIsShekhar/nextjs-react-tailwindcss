import { useState } from 'react';
import ResultCard from '../ResultCard'; // Update the path as per your project structure

function SearchBar() {
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoadingGif, setShowLoadingGif] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShowLoadingGif(true); // Show loading GIF when submitting

    const urlPattern = new RegExp(
      '(https?://(?:teraboxapp\\.com/s/[\\w-]+|www\\.1024tera\\.com/wap/share/filelist\\?surl=[\\w-]+|www\\.bestclouddrive\\.com/wap/share/filelist\\?surl=[\\w-]+|www\\.terabox\\.app/wap/share/filelist\\?surl=[\\w-]+|www\\.terabox\\.app/sharing/link\\?surl=[\\w-]+|www\\.terabox\\.app/s/[\\w-]+))'
    );

    if (!urlPattern.test(url)) {
      setError('Invalid URL format');
      setLoading(false);
      setShowLoadingGif(false);
      return;
    }

    try {
      const response = await fetch(`/api/fetchData?url=${encodeURIComponent(url)}`); // Updated to use API route
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResponseData(data);
      setShowResultCard(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setShowLoadingGif(false); // Hide loading GIF when data is fetched
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
            src="/loading.gif" // Update to the correct path of your loading GIF
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
      </div>
    </div>
  );
}

export default SearchBar;
