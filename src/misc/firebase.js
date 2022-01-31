import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const config = {
    apiKey: "AIzaSyBTCGK2GPcYysmybd3VNmgp4HTLIDp8UJg",
    authDomain: "chat-app-te.firebaseapp.com",
    databaseURL: "https://chat-app-te-default-rtdb.firebaseio.com",
    projectId: "chat-app-te",
    storageBucket: "chat-app-te.appspot.com",
    messagingSenderId: "1065051148991",
    appId: "1:1065051148991:web:8ad3ab1b937bec1a222c0a"
};

export const fcmVapidKey =
  'BLs_I-HQyrAuUJJh8H3U0vtHGhVhXLMqoVoomeNL90GMKm0-o7sSoN9CJYRiBAVz-Yi7ZAni8mKateJfDwodTnw';

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();