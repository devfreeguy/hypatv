// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
const auth = getAuth(app);
const db = getFirestore(app);

export const signup = async (email, password, proceed = () => {}) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      sessionStorage.setItem(
        "usersdata",
        JSON.stringify({
          email: credentials.user.email,
          uid: credentials.user.uid,
        })
      );
      proceed(true, "");
    })
    .catch((err) => {
      proceed(false, err);
    });
};

export const signin = async (email, password, proceed = () => {}) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      sessionStorage.setItem(
        "usersdata",
        JSON.stringify({
          email: credentials.user.email,
          uid: credentials.user.uid,
        })
      );
      proceed(true, "");
    })
    .catch((err) => {
      proceed(false, err);
    });
};

export const signout = async (proceed = () => {}) => {
  try {
    await signOut(auth);
    sessionStorage.removeItem("usersdata");
    proceed();
  } catch (error) {
    proceed(error)
  }
};

export const saveData = async (data = {}, to, respond) => {
  try {
    // await addDoc(collection(db, to), data);
    await setDoc(doc(db, to, JSON.parse(sessionStorage.getItem("usersdata")).uid), data)
      .then(() => {
        respond("success", "");
      })
      .catch((err) => {
        respond("error", err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (from) => {
  try {
    const response = await getDocs(collection(db, from));
    const data = [];
    response.forEach((item) => {
      data.push(item.data());
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const updateData = async (data = {}, to, response) => {
  await updateDoc(
    doc(db, to, JSON.parse(sessionStorage.getItem("usersdata")).uid),
    data
  ).then(()=>{
    response()
  }).catch((error)=>{
    response(error)
  });
}
