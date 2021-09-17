
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBa_liKXrLOTl2hhTuVGMleEZqWk46h4nQ",
    authDomain: "final-c21b1.firebaseapp.com",
    projectId: "final-c21b1",
    storageBucket: "final-c21b1.appspot.com",
    messagingSenderId: "1029406675613",
    appId: "1:1029406675613:web:d2680ddf172592c8457a74",
    measurementId: "G-7HTWREGL03"
  };
  
  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

export default firebase;