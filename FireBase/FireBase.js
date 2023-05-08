// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA",
  authDomain: "ecommerce-site-57dcb.firebaseapp.com",
  databaseURL: "https://ecommerce-site-57dcb-default-rtdb.firebaseio.com",
  projectId: "ecommerce-site-57dcb",
  storageBucket: "ecommerce-site-57dcb.appspot.com",
  messagingSenderId: "716578513084",
  appId: "1:716578513084:web:ad198400fc9dfd025030b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
