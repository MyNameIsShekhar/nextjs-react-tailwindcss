import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


// pages/index.js

import SearchBar from './SearchBar'; // Using relative import path

function Home() {
  return (
    <div>
      <SearchBar />
      {/* Other content */}
    </div>
  );
}

export default Home;
