// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo6pPvZofjXYjXYaoGMYKSjY6D9uQcPWQ",
  authDomain: "superbowlsquares-db1.firebaseapp.com",
  databaseURL: "https://superbowlsquares-db1-default-rtdb.firebaseio.com",
  projectId: "superbowlsquares-db1",
  storageBucket: "superbowlsquares-db1.appspot.com",
  messagingSenderId: "637010006131",
  appId: "1:637010006131:web:aba7768be5c7b7c955da06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);