// Firebase Web App, Firestore & Auth Initialization via Official ESM Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD4lnOkkWdel2ceANaTNFmk3A954OddZo",
  authDomain: "kanturwebsite.firebaseapp.com",
  projectId: "kanturwebsite",
  storageBucket: "kanturwebsite.firebasestorage.app",
  messagingSenderId: "1012825104029",
  appId: "1:1012825104029:web:e06c42aa9061cbc7b47e74",
  measurementId: "G-2SZW7RMNM8"
};

// Initialize Firebase App, Firestore Database & Authentication
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics safely
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, db, auth, analytics };
export default app;
