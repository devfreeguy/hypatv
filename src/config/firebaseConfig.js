// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_9ZJJS1Dwi_L58Gfq4TP9uJk8WHMBzg0",
  authDomain: "hypaflix.firebaseapp.com",
  databaseURL: "https://hypaflix-default-rtdb.firebaseio.com",
  projectId: "hypaflix",
  storageBucket: "hypaflix.appspot.com",
  messagingSenderId: "100102869900",
  appId: "1:100102869900:web:e1707a91b02dda51cb3ca9",
  measurementId: "G-06LV84RWSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
