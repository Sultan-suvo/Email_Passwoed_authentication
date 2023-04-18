// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOXVLj8YteSBuoBm6XFwSL0rZnz45D45A",
  authDomain: "emial-password-auth.firebaseapp.com",
  projectId: "emial-password-auth",
  storageBucket: "emial-password-auth.appspot.com",
  messagingSenderId: "470073174873",
  appId: "1:470073174873:web:d5024cbf75635937daba48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;