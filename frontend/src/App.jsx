import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Signup from "./Containers/signup/signup";
import Landing from "./Containers/Landing/landing";
import Tracks from "./Containers/FavArtistsTracks/tracks";
import Home from "./Assests/Home";

import Dropdown from "./Containers/Prefrences/Prefrences_Container/Dropdown";
import Listbox from "./Containers/Prefrences/Prefrences_Container/Listbox";
import Detail from "./Containers/Prefrences/Prefrences_Container/Detail";
import "./App.scss";
import { Credentials } from "./Spotify_Api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap"
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [addto, setAddto] = useState({ name: "", id: "" , tracks:[]});


  const spotify = Credentials();

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/artists/2CIMQHirSU0MQqyYHq0eOx", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items,
        });
      });
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<Signup />}></Route>
        <Route
          path="/"
          element={
            <Landing
              user={user}
              setUser={setUser}
              token={token}
              addto={addto}
              
              setAddto={setAddto}
            />
          }
        >
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/Tracks"
            element={<Tracks user={user} setUser={setUser} token={token} addto={addto} />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
