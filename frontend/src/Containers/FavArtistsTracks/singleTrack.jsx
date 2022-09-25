import React, { useState, useEffect } from "react";
import "./aTracks.scss";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";


function Tracks(props) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "73a6cb5c6a7c482192ce32f93ed7daf3",
  });

  const accessToken = props.token;
  const search = props.item;
  const[tracknames, setTracknames]=useState([])
  const [tracks, setTracks]=useState({})

  const [searchResults, setSearchResults] = useState([]);

   useEffect(() => {
     if (!accessToken) return;
     spotifyApi.setAccessToken(accessToken);
   }, [accessToken]);
   
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);
  
 
console.log(searchResults)

  
  return (
    <div  className="d-flex flex-column py-2"
        style={{ height: "100vh" }}>
      
        <div className="flex-grow-1 my-2 scroll_music" style={{ overflowY: "scroll" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              addto={props.addto}
            />
          ))}
        </div>
        {/* <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div> */}
    </div>
  );
}

export default Tracks;
