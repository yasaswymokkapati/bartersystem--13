import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyDvQws6ksK52EizEyUD0A5-PiaFT9xqBPM",
  authDomain: "bartersystem-9d59d.firebaseapp.com",
  databaseURL: "https://bartersystem-9d59d.firebaseio.com",
  projectId: "bartersystem-9d59d",
  storageBucket: "bartersystem-9d59d.appspot.com",
  messagingSenderId: "70948540658",
  appId: "1:70948540658:web:8abfa3977b0f6b3fb3406b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase.firestore();