import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate the form data

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    //signin or signup logic
    if(!isSignInForm) {
      // SignUp logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      const {uid, email, displayName, photoURL} =  auth.currentUser;
      dispatch(
        addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      setErrorMessage(error.message)
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

    }
    else {
      // Signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  })
    }

  };

  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="logo"
      />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />
        )}
        <input ref={email} type="text" placeholder="Email  Address" className="p-4 my-4 w-full bg-gray-700" />
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button onClick={handleButtonClick} className="p-4 my-4 bg-red-500 rounded-lg w-full cursor-pointer">
        {isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? SignUp Now" : "Already Registered ? SignIn Now"}</p>
      </form>
    </div>
  )
}

export default Login;