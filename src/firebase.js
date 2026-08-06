// Firebase Web App, Firestore & Auth Initialization via Official ESM Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration from .env variables with default fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBD4lnOkkWdel2ceANaTNFmk3A954OddZo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kanturwebsite.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kanturwebsite",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kanturwebsite.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1012825104029",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1012825104029:web:e06c42aa9061cbc7b47e74",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2SZW7RMNM8"
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
