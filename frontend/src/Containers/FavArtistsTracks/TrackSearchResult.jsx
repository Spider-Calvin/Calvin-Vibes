import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {client } from "../../client"

export default function TrackSearchResult({ track, chooseTrack ,addto}) {
  function handlePlay() {
    chooseTrack(track);
  }

const addto_playlist =()=>{
if(addto.id==""){
  alert("select a playlist")
}
else{
  client
    .patch(addto.id) // Document ID to patch
    .set({
      tracks: [...addto.tracks,
        {
          artist_name: track.artist,
          track_name: track.title,
          img: track.albumUrl,
        },
      ],
    })
    .commit()
    .then((updated) => {
      alert("Added song to playlist")
    }); 
}

}
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ width: "64px", margin: "0 20px 0 0", borderRadius: "8px" }}
      />
      <div className="ml-3">
        <div>
          {track.title}{" "}
          <div style={{ paddingLeft: "20px", display: "inline-block" }}>
            <AiOutlineAppstoreAdd onClick={addto_playlist}
              style={{ fontSize: "25px", color: "rgb(226, 151, 0)" }}
            />
          </div>{" "}
        </div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
