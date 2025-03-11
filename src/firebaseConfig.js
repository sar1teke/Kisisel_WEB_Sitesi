// Import Firebase SDK
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // Bunu ekle

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn-wfkf1cXrBiltLZeiU0WBrSPzk0Cyoc",
  authDomain: "sariteke-be177.firebaseapp.com",
  projectId: "sariteke-be177",
  storageBucket: "sariteke-be177.firebasestorage.app",
  messagingSenderId: "720858830497",
  appId: "1:720858830497:web:979f26772a8656467102e0",
  measurementId: "G-K8SPV4YBFS"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db};