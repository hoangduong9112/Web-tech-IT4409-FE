import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = { 
  apiKey: "AIzaSyDN_rh8eo9_WrbrobusGul_dFpKwH4inoI",
  authDomain: "trello-aebef.firebaseapp.com",
  projectId: "trello-aebef",
  storageBucket: "trello-aebef.appspot.com",
  messagingSenderId: "320919593867",
  appId: "1:320919593867:web:560210fd9c8e019a95858e",
  measurementId: "G-2357KWRGKY",
  databaseURL: 'https://trello-aebef-default-rtdb.asia-southeast1.firebasedatabase.app',
  

};

const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database(app);
export const provider = new firebase.auth.GoogleAuthProvider();