// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiMr8-1sZ2OqCK0K01b68fE8njhkMVzRw",
    authDomain: "my-instagram-86d3a.firebaseapp.com",
    projectId: "my-instagram-86d3a",
    storageBucket: "my-instagram-86d3a.appspot.com",
    messagingSenderId: "76247726728",
    appId: "1:76247726728:web:2715b21447e4385cd97d3d",
    measurementId: "G-Q6P1J9CFV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);