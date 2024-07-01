// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realist-app-udemy-424613.firebaseapp.com",
  projectId: "realist-app-udemy-424613",
  storageBucket: "realist-app-udemy-424613.appspot.com",
  messagingSenderId: "886025514147",
  appId: "1:886025514147:web:27e507f98ae0e940752316"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);