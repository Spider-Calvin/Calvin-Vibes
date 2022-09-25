import React , {useState,useEffect}from 'react'
import "./aTracks.scss"
import axios from 'axios';
import SingleTrack from "./singleTrack"

function Tracks(props) {  
const token = props.token;
const user = JSON.parse(localStorage.getItem("profile"));





  return (
    <div>
       { user.artist_ids.map((item)=> (<SingleTrack token={token} item={item} addto={props.addto} />))}     
    </div>
  )
}

export default Tracks
