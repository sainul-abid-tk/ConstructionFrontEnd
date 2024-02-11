// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL6yQA-TMZhIAlqHaHwL3Z-t18KzGm1k4",
  authDomain: "connectie-auth.firebaseapp.com",
  projectId: "connectie-auth",
  storageBucket: "connectie-auth.appspot.com",
  messagingSenderId: "104160569279",
  appId: "1:104160569279:web:3a8bce54fdbe69ac75230a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)