import React, { useState, useEffect } from "react";
import "./prefrences.scss";
import { Credentials } from "../../Spotify_Api";
import axios from "axios";

import Dropdown from "./Prefrences_Container/Dropdown";
import Listbox from "./Prefrences_Container/Listbox";
import Detail from "./Prefrences_Container/Detail";


function Prefrences(props) {
  const artist_names = props.artist_ids;
  const setArtist_names = props.setArtist_ids;
  const types_selected = props.types_selected;
  const setTypes_selecteed = props.setTypes_selecteed;
  const preferedGenner = props.preferedGenner;
  const setPreferedGenner = props.setPreferedGenner;
  

  const type = ["Hiphop","Rap","pop","Dj","Classical","Devotional","Indian","Kannada"]
  

  const spotify = Credentials();
  const [preferedGenner_name, setPreferedGenner_name] = useState([]);
  const Genres_name = preferedGenner;
  const [gener_cancelled, setGener_Cancelled]=useState(false)

  // ====================Artist===========================

  const [artist_searched, setArtist_searched]= useState("");
  const [artist_data,setArtist_data]=useState([]);
  // const [artist_names,setArtist_names]=useState([]);
  const [art,setArt]=useState(true)
  
  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
   const [playlist, setPlaylist] = useState({
     selectedPlaylist: "",
     listOfPlaylistFromAPI: [],
   });
   const [tracks, setTracks] = useState({
     selectedTrack: "",
     listOfTracksFromAPI: [],
   });
   const [trackDetail, setTrackDetail] = useState(null);

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
      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
      })
        .then((genreResponse) => {
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items,
          });
        });
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
 
  useEffect(() => {
    if (!artist_searched == "") {
      axios("https://api.spotify.com/v1/search?q="+artist_searched+"&type=artist&limit=4", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((artist_data) => setArtist_data(artist_data.data.artists.items));
    }
  }, [artist_searched]);


  const artist_selected= (item)=>{
    setArtist_names((artist_names)=>([...artist_names,item.name]))
    setArt((prev)=>(!prev))
  }

const type_selected = (e)=>{
  setTypes_selecteed([...types_selected,e.target.value]);
  setGener_Cancelled((prev) => !prev);

}

const remove_type = (name)=>{
  const indexe = types_selected.indexOf(name);
  types_selected.splice(indexe, 1);
  setGener_Cancelled((prev)=>(!prev))
}



  const genreChanged = (val) => {
    setPreferedGenner((preferedGenner)=>[...preferedGenner,val]) 
    
    genres.listOfGenresFromAPI.map((item)=>{
      if(Object.values(item).includes(val)){
        setPreferedGenner_name((preferedGenner_name) => [...preferedGenner_name, item.name]);
      }
    })

    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=20`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });
    });

    console.log(val);
  };



const remove_Gener = (name)=>{
const indexe = preferedGenner_name.indexOf(name);
preferedGenner_name.splice(indexe, 1); 

setPreferedGenner_name(preferedGenner_name);
 genres.listOfGenresFromAPI.map((item) => {
   if (Object.values(item).includes(name)) {
    const index = preferedGenner.indexOf(item.id);
      preferedGenner.splice(index, 1); // 2nd parameter means remove one item only
   }
 });
 console.log(preferedGenner)
 setGener_Cancelled((prev)=>(!prev))
}

const remove_artist = (name) => {
  const indexc = artist_names.indexOf(name);
  artist_names.splice(indexc, 1);

  // artist_data.map((item) => {
  //   if (Object.values(item).includes(name)) {
  //     const indexi = artist_ids.indexOf(item.id);
  //     artist_ids.splice(indexi, 1); // 2nd parameter means remove one item only
  //   }
  // });

  setGener_Cancelled((prev) => !prev);
};



  return (
    <div>
      <div>
        <div className="prefrences_form">
          <div className="prefrences_block">
            <div className=" align-items-center form-group row px-0">
              <label className="form-label col-sm-2">
                Select type of music you like most
              </label>
              <select
                className="form-control pref_select form-control-sm col-sm-10"
                onChange={type_selected}
              >
                {type.map((item) => (
                  <option>{item}</option>
                ))}
              </select>
            </div>

            {gener_cancelled ? (
              <div className="Gerners_names_con">
                {types_selected.map((item) => (
                  <div className="genres_btn" onClick={() => remove_type(item)}>
                    <button type="button" className="btn btn-primary">
                      {item} <span className="badge text-bg-secondary">X</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="Gerners_names_con">
                {types_selected.map((item) => (
                  <div className="genres_btn" onClick={() => remove_type(item)}>
                    <button type="button" className="btn btn-primary">
                      {item} <span className="badge text-bg-secondary">X</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Dropdown
              label="Genre:"
              options={genres.listOfGenresFromAPI}
              selectedValue={genres.selectedGenre}
              changed={genreChanged}
              // setPreferedGenner_name={setPreferedGenner_name}
            />

            {gener_cancelled ? (
              <div className="Gerners_names_con">
                {preferedGenner_name.map((item) => (
                  <div
                    className="genres_btn"
                    onClick={() => remove_Gener(item)}
                  >
                    <button type="button" className="btn btn-danger">
                      {item} <span className="badge text-bg-secondary">X</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="Gerners_names_con">
                {preferedGenner_name.map((item) => (
                  <div
                    className="genres_btn"
                    onClick={() => remove_Gener(item)}
                  >
                    <button type="button" className="btn btn-danger">
                      {item} <span className="badge text-bg-secondary">X</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="artist_con">
              <div className="artist_search_bar">
                <label>Serch and Select your favriote Artists (min four)</label>
                <input
                  className="artist_search_bar_pl"
                  type="text"
                  placeholder="Search here"
                  onChange={(e) => setArtist_searched(e.target.value)}
                />
              </div>
              <div className="artist_dropdown">
                {artist_data.map((item) => (
                  <div onClick={() => artist_selected(item)}>{item.name}</div>
                ))}
              </div>
            </div>
            {art ? (
              <div className="Gerners_names_con">
                {artist_names.map((item) => (
                  <div
                    className="genres_btn"
                    onClick={() => remove_artist(item)}
                  >
                    <button type="button" className="btn btn-warning">
                      {item} <span className="badge text-bg-secondary">X</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="Gerners_names_con">
                {artist_names.map((item) => (
                  <div
                    className="genres_btn"
                    onClick={() => remove_artist(item)}
                  >
                    <button type="button" className="btn btn-warning">
                      {item} <span className="badge text-bg-warning">X</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prefrences;
