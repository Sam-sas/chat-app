import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyBTCGK2GPcYysmybd3VNmgp4HTLIDp8UJg",
    authDomain: "chat-app-te.firebaseapp.com",
    databaseURL: "https://chat-app-te-default-rtdb.firebaseio.com",
    projectId: "chat-app-te",
    storageBucket: "chat-app-te.appspot.com",
    messagingSenderId: "1065051148991",
    appId: "1:1065051148991:web:8ad3ab1b937bec1a222c0a"
  }

  const app = firebase.initializeApp(config);