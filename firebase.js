// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaECLVfNVTJzMYOeGbIK3haEljLsq34hE",
  authDomain: "caching-511ab.firebaseapp.com",
  projectId: "caching-511ab",
  storageBucket: "caching-511ab.appspot.com",
  messagingSenderId: "909268211788",
  appId: "1:909268211788:web:f24e492b06182d8afcbce9",
  measurementId: "G-DKJFK7WLGX"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
  
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();