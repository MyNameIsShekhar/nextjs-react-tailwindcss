import React from 'react';

function ResultCard({ fileData, handleDownload }) {
  const { file_name, link, direct_link, thumb, size } = fileData;

  return (
    <div className="max-w-md mx-auto bg-transparent rounded-lg border border-gray-300 overflow-hidden shadow-lg mb-4">
      {/* Thumbnail */}
      <div className="bg-transparent mt-4"> {/* Added mt-4 for top margin */}
        <img
          className="mx-auto"
          style={{ maxWidth: "150px", maxHeight: "200px", display: "block", backgroundColor: "transparent" }}
          src={thumb}
          alt={file_name}
        />
      </div>

      <div className="px-6 py-4">
        {/* File Name */}
        <div className="font-bold text-xl text-white mb-2">{file_name}</div>
        
        {/* Size */}
        <p className="text-white text-base mb-2">Size: {size}</p>

        {/* Download Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleDownload(link)}
          >
            Download
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleDownload(direct_link)}
          >
            Direct Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
