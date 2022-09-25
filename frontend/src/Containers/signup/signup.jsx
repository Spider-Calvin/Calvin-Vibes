import React from 'react'
import "./signup.scss"
import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { client } from "../../client";
import { Routes, Route, NavLink } from "react-router-dom";
import Prefrences from '../Prefrences/prefrences';

const Signup = () => {
  const [submit, setSubmit] = useState(true);
  const [artist_ids, setArtist_ids] = useState([]);
  const [types_selected, setTypes_selecteed] = useState([]);
  const [preferedGenner, setPreferedGenner] = useState([]);
  const [prefError,SetPreferror]=useState([""])  
  const [preff_error,setPreff_error]=useState(false)
  const [creating,SetCreating]=useState(false)


  const [values, setValues] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",
    birthday: "",
    phone: "",
    password:""
  });

  const inputs = [
    {
      id: 0,
      name: "First_Name",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 1,
      name: "Last_Name",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 1-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{1,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "0000000000",
      errorMessage: "It should be a valid 10 digit mobile number",
      label: "Phone Number",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(artist_ids);
    // console.log(types_selected);
    // console.log(preferedGenner);

    

    const users = {
      _type: "users",
      firstname: values.First_Name,
      lastname: values.Last_Name,
      email: values.email,
      phonenumber: values.phone,
      dob: values.birthday,
      password:values.password,
      artist_ids,
      types_selected,
      preferedGenner
    };
   
    if (
      types_selected.length >= 1 &&
      preferedGenner.length >= 2 &&
      artist_ids.length >= 4
    ) {
      SetCreating(true); 

       client
         .create(users)
         .then(() => {
           console.log("succesfully sent to backend");
           setSubmit(false);
         })
         .catch((err) => {
           console.log(err);
         });
    }
    
    if  (!(types_selected.length >= 2)) {
      SetPreferror("* Select minimum two type of music");
      setPreff_error((prev) => !prev);
    } 
    else if (!(preferedGenner.length >= 2)) {
      SetPreferror("* Select minimum two genre of music");
      setPreff_error((prev) => !prev);
    } else if (!(artist_ids.length >= 4)) {
      SetPreferror("* Select minimum four artist");
      setPreff_error((prev) => !prev);
    } 

    console.log(preferedGenner.length);
  };

  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  


  return (
    <>
      <div className="signup">
        <form onSubmit={handleSubmit}>
          {submit ? (
            <>
              <h2>SignUp</h2>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <Prefrences
                artist_ids={artist_ids}
                setArtist_ids={setArtist_ids}
                types_selected={types_selected}
                setTypes_selecteed={setTypes_selecteed}
                preferedGenner={preferedGenner}
                setPreferedGenner={setPreferedGenner}
              />
              {preff_error ? <div>{prefError}</div> : <div>{prefError}</div>}
              <button>
                {creating ? "Creating...  account" : "Create Account"}
              </button>
            </>
          ) : (
            <>
              <h2>
                Account Created Succesfully <NavLink to="/">SignIn</NavLink> to
                your Account{" "}
              </h2>
            </>
          )}
        </form>

        <div>
          Already have an account <NavLink to="/">SignIn</NavLink>
        </div>
      </div>
    </>
  );
};

export default Signup;

