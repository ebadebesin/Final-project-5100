// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNAape2cd-P6sKJKYApDANtxQoEL6YKQI",
    authDomain: "brieflydata.firebaseapp.com",
    projectId: "brieflydata",
    storageBucket: "brieflydata.firebasestorage.app",
    messagingSenderId: "1039911457450",
    appId: "1:1039911457450:web:2b1a06ddeeecfd05d6b6d3",
    measurementId: "G-P4ZLK2MDTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, display the user's name
        const usernameSpan = document.getElementById('username');

        // Check if user has a displayName
        const displayName = user.displayName || "No Name Found"; // default if displayName is not set
        usernameSpan.textContent = displayName;
    } else {
        // User is not signed in, optionally redirect to login page
        console.log("No user is signed in");
    }
});