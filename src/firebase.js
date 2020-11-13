import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSIXIrrP4tTGDGGFycY-HHRIywtsvDm2A",
  authDomain: "olx-clone-10078.firebaseapp.com",
  databaseURL: "https://olx-clone-10078.firebaseio.com",
  projectId: "olx-clone-10078",
  storageBucket: "olx-clone-10078.appspot.com",
  messagingSenderId: "332682541441",
  appId: "1:332682541441:web:8f06cca2425071ec7a1080",
  measurementId: "G-VW81YX4N2W",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
