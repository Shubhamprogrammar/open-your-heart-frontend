import React from 'react'
import Anotes from './Anotes'
import HeartNote from './HeartNote';
import Footer from './Footer';

function Home() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <HeartNote />
        <Anotes />
      </div>
      <Footer />
    </div>
  )
}

export default Home;
