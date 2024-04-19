// apiConfig.js

// Define your API endpoints and corresponding regex patterns
const apiConfig = [
  {
    name: 'TeraBox',
    endpoint: 'https://fetch-media-kohl.vercel.app/api?url=',
    regex: new RegExp(
      '(https?://(?:teraboxapp\\.com/s/[\\w-]+|www\\.1024tera\\.com/wap/share/filelist\\?surl=[\\w-]+|www\\.bestclouddrive\\.com/wap/share/filelist\\?surl=[\\w-]+|www\\.terabox\\.app/wap/share/filelist\\?surl=[\\w-]+|www\\.terabox\\.app/sharing/link\\?surl=[\\w-]+|www\\.terabox\\.app/s/[\\w-]+))'
    ),
    cardComponent: 'ResultCard', // Replace 'ResultCard' with your actual component name
  },
  {
    name: 'Instagram',
    endpoint: '/api/insta',
    regex: new RegExp('https?://(?:www\\.)?instagram\\.com/(?:stories|p|reel)/[-\\w./?=&]+'),
    cardComponent: 'InstaCard', // Replace 'InstaCard' with your actual component name
  },
  // Add more API configurations as needed
];

export default apiConfig;
