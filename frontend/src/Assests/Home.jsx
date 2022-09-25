import React from 'react'
import home from "./home.png"

function Home() {
  return (
    <div>
      <h2 style={{ margin: "0px", padding: "10px 0 0px 20px", color: "#6C63FF" ,textAlign:"left" }}>
        Welcome to your music player
      </h2>
      <img src={home} alt="" />
    </div>
  );
}

export default Home
