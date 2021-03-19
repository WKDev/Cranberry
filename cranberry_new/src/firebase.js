import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxQQvNAtYmrBvfiL69T_ZT5f5mI7tbz9w",
  authDomain: "cranberry-f84d9.firebaseapp.com",
  databaseURL: "https://cranberry-f84d9-default-rtdb.firebaseio.com",
  projectId: "cranberry-f84d9",
  storageBucket: "cranberry-f84d9.appspot.com",
  messagingSenderId: "728439473986",
  appId: "1:728439473986:web:29f3baf38d2897e9feeadb",
  measurementId: "G-HJL0SVMQRL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const database = firebase.database();

export {database};