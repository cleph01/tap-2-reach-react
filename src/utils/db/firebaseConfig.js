// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGoszk3W9p1HzFkODkLrt3CEuJIjPZr1Y",
    authDomain: "tap2reach.firebaseapp.com",
    projectId: "tap2reach",
    storageBucket: "tap2reach.appspot.com",
    messagingSenderId: "71020923632",
    appId: "1:71020923632:web:9a481c68d58e0c138cd035",
    measurementId: "G-E5M7BK2QEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();

export { db };
