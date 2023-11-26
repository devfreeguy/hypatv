// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQx5w1YOme1sP3qZTmFa6dnsrynZoo6y8",
  authDomain: "hypatvspace.firebaseapp.com",
  projectId: "hypatvspace",
  storageBucket: "hypatvspace.appspot.com",
  messagingSenderId: "520604097078",
  appId: "1:520604097078:web:fb0964e1d3ab33558b5697",
  measurementId: "G-2RYEG2NRM7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const signup = async (email, password, proceed = () => {}) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      if (sessionStorage.getItem('jhwviibibciussicvkv') !== credentials.user.uid) {
        sessionStorage.setItem('jhwviibibciussicvkv', credentials.user.uid);
      }
      proceed(true, "");
    })
    .catch((err) => {
      proceed(false, err);
    });
  };

export const signin = async (email, password, proceed = () => {}) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      if (sessionStorage.getItem('jhwviibibciussicvkv') !== credentials.user.uid) {
        sessionStorage.setItem('jhwviibibciussicvkv', credentials.user.uid);
      }
      proceed(true, "");
    })
    .catch((err) => {
      proceed(false, err);
    });
};

export const saveData = async () =>{}