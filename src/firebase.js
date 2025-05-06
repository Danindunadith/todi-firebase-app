// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "taskmanager-c6224.firebaseapp.com",
    projectId: "taskmanager-c6224",
    storageBucket: "taskmanager-c6224.firebasestorage.app",
    messagingSenderId: "542217555122",
    appId: "1:542217555122:web:2fde10e7e093495fa08dab"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
