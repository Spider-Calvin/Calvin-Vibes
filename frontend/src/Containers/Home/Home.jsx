import React, { useReducer, useState } from 'react'
import"./Home.scss"
import {BiLogOutCircle} from "react-icons/bi"
import {MdLibraryAdd} from "react-icons/md"
import { AiFillFolderAdd, AiFillDelete } from "react-icons/ai";
import {
  BsPeopleFill,
  BsJournalAlbum,
  BsFillFileMusicFill,
  BsFillPenFill,
  BsFileX,
} from "react-icons/bs";
import { client } from "../../client";
import {FaSearch} from "react-icons/fa"
import { Routes, Route, NavLink,Outlet ,useNavigate} from "react-router-dom";
import home from "../../Assests/home.png"
import { useEffect } from 'react';
import moment from "moment";


function Home(props) {
  const[playlists,setPlaylists]=useState([])
  const[playSec, setPlaySec]=useState({name:"",id:""})
  const[newName,setNewName]=useState("")
  const addto =props.addto;
  const setAddto = props.setAddto;

  useEffect(() => {
    const query = '*[_type == "playlists"]';

    client.fetch(query).then((data) => {
      setPlaylists(data);
    });
  }, [newName, ]);

  console.log(playlists)

const updateName=()=>{
  client
    .patch(playSec.id) // Document ID to patch
    .set({ name: newName })
    .commit()
    .then((updated) =>{ console.log(updated);
    setNewName("");
   setPlaySec({name:"",id:""});}); 

}

 const new_play_list = {
   _type: "playlists",
  name:"New Playlist",
  tracks:[]
 };

const create_playlist=()=>{

  client
    .create(new_play_list)
    .then((response) => {
      console.log(response)
      alert("SuccessFully Created a Playlist")
    })
    .catch((err) => {
      console.log(err);
    });
}



  const token = props.token;
  const navigate = useNavigate;
   
  return (
    <div className="container-fluid">
      <div className="search_bar_div">
        <div>
          <div className="search_songs_div">
            <FaSearch />
            {"  "}
            <input className="search_songs" type="text" /> music search is not
            implemented yet
          </div>
        </div>
        <div>
          logged in as {props.user.firstname}{" "}
          <div
            className="logout_btn"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <NavLink to="/">
              <BiLogOutCircle /> log out
            </NavLink>
          </div>
        </div>
      </div>
      <div className="main_containner">
        <div className="main_container_body row">
          <div className="col-3">
            <div className="playlist">
              {playlists.map((item) => (
                <>
                  <div className="play_btn_con">
                    <button
                      type="button"
                      className={
                        addto.id == item._id
                          ? "playlist_selected playlist_name"
                          : "playlist_name"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlaySec({ id: item._id, name: item.name });
                      }}
                    >
                      {item.name} <BsFillPenFill />
                    </button>
                    <AiFillFolderAdd
                      className="add_btn"
                      onClick={() => {
                        if (addto.id == item._id) {
                          setAddto({
                            id: "",
                            name: "",
                            tracks: [],
                          });
                        } else {
                          setAddto({
                            id: item._id,
                            name: item.name,
                            tracks: item.tracks,
                          });
                        }
                      }}
                    />
                    <AiFillDelete className="add_btn" onClick={() => {
                    client.delete(item._id).then((rsponse) => {
                      alert("Playlist Deleted succesfullly")
                    });
                    }} />
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      paddingRight: "20px",
                      fontSize: "12px",
                    }}
                  >
                    created {moment(item._createdAt).fromNow()}, Modified{" "}
                    {moment(item._updatedAt).fromNow()}
                  </div>
                  <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">
                            Editing playlist : {playSec.name}
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <input
                            type="text"
                            class="form-control"
                            onChange={(e) => {
                              setNewName(e.target.value);
                            }}
                            placeholder="Enter the new name"
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => updateName()}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.tracks.map((item) => (
                    <div
                      className="d-flex m-2 align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.img}
                        style={{
                          width: "35px",
                          margin: "0 10px 0 15px",
                          borderRadius: "15px",
                        }}
                      />
                      <div className="ml-3">
                        <div style={{ fontSize: "12px" }}>
                          {item.artist_name}
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          {item.track_name}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ))}
              <div className="create_playlist" onClick={create_playlist}>
                create a play list <MdLibraryAdd />
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="recomended_btn_con">
              {" "}
              <p>Recomendations </p>
              <NavLink to="/tracks" style={{ textDecoration: "none" }}>
                <div className="recomended_btn">
                  <BsPeopleFill /> Artists Songs
                </div>
              </NavLink>
              <div className="recomended_btn">
                <BsJournalAlbum /> Album Songs
              </div>
              <div className="recomended_btn">
                <BsFillFileMusicFill /> Genre
              </div>
            </div>
            <div className="main_space">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="music_player_div"></div>
    </div>
  );
}

export default Home
