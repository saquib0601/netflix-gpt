// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDeQpYJqTCDJpCE0-q_3jHSLpI_uDb57c",
  authDomain: "netflixgpt-1aa0d.firebaseapp.com",
  projectId: "netflixgpt-1aa0d",
  storageBucket: "netflixgpt-1aa0d.appspot.com",
  messagingSenderId: "836215484764",
  appId: "1:836215484764:web:e62dc2fdd5c6222f3a1199",
  measurementId: "G-9MEQHQWX0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();