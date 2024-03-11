import path from 'path';
import * as admin from 'firebase-admin';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Replace Me",
  authDomain: "Replace Me",
  projectId: "Replace Me",
  storageBucket: "Replace Me",
  messagingSenderId: "Replace Me",
  appId: "Replace Me"
};

const serviceAccount = require(path.join(__dirname,'..','firebase_credentials.json'));

export default function initializeFirebase() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //Initialize Firebase Admin
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
}