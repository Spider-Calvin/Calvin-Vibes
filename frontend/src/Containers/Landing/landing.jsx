import React from "react";
import "./landing.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import music from "../../Assests/music.svg";
import { client } from "../../client";
import { useState, useEffect } from "react";
import Home from "../Home/Home";

function Landing(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const user = props.user;
  const setUser = props.setUser;
  const [users, setUsers] = useState([]);
  const [user_found,setUserfound]=useState(false)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    users.map((item) =>  { 
    if(Object.values(item).includes(login.email)) {
      setUserfound(true);
    }
  });

    const query = '*[_type == "users"]';

    client.fetch(query).then((data) => {
      setUsers(data);
    });
  }, [login.email]);

  const signIn = async () => {
    users.map((item) =>  { 
       if(Object.values(item).includes(login.email)) {
        if (item.password != login.password) {
          alert("wrong password");
        } else {
          localStorage.setItem("profile", JSON.stringify(item));
          setUser(JSON.parse(localStorage.getItem("profile")));
          console.log(user.firstname);
        }
      }
    });

    (!user_found )&&alert("user not found")
  };




if(user){
  return (
    <>
      <Home user={user} token={props.token} addto={props.addto} setAddto={props.setAddto} />
    </>
  );
}
else{

  return (
    <div class="login">
      <div class="login__content">
        <div class="login__img">
          <img src={music} alt="" />
        </div>

        <div class="login__forms">
          <form action="" class="login__registre" id="login-in">
            <h1 class="login__title">Sign In</h1>

            <div class="login__box">
              <i class="bx bx-user login__icon"></i>
              <input
                type="email"
                placeholder="Email id"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                class="login__input"
              />
            </div>

            <div class="login__box">
              <i class="bx bx-lock-alt login__icon"></i>
              <input
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                type="password"
                placeholder="Password"
                class="login__input"
              />
            </div>

            <a onClick={signIn} class="login__button">
              Sign In
            </a>

            <div>
              <div class="login__account">Don't have an Account ?</div>
              <div class="login__signin" id="sign-up">
                {" "}
                <NavLink to="/SignUp">Sign Up</NavLink>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}           
}


export default Landing;
