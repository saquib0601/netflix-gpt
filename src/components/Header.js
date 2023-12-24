import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLanguage } from "../utils/configSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { auth } from '../utils/firebase';
import { toggleGptSearchView } from "../utils/gptSlice";
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // below function is takecare by onAuthStateChanged
      // navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
    
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleGptSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
        
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // this will be called when component is unmount
    return () => unsubscribe();

  },[]);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img className="w-44"
      src={LOGO} 
        alt="logo"
      />
    { user && (
    <div className="flex p-2">
    { showGptSearch && (
      <select className="p-2 m-2 bg-gray-500 text-white" onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
      </select>) }
    <button className="py-2 px-2 m-2 bg-purple-800 text-white rounded-lg"
    onClick={handleGptSearchClick}
    >
    {showGptSearch ? "Home Page" : "GPT Search"}
    </button>
      <img 
        className="w-12 h-12"
        alt="usericon"
        src={USER_AVATAR}
      />
      <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
    </div>
    )}
    </div>
  )
}

export default Header;