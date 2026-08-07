// Firebase Web App, Firestore & Auth Initialization via Official ESM Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration loaded exclusively from environment variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app = null;
let db = null;
let auth = null;
let analytics = null;

// Only initialize Firebase if a valid non-placeholder API key is present in .env
const isValidApiKey = Boolean(
  firebaseConfig.apiKey &&
  typeof firebaseConfig.apiKey === 'string' &&
  firebaseConfig.apiKey.trim().length > 10 &&
  !firebaseConfig.apiKey.includes('YOUR_') &&
  !firebaseConfig.apiKey.includes('dummy')
);

if (isValidApiKey) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (error) {
    console.warn("Firebase Notice: Key pending setup in .env:", error.message);
  }
} else {
  console.info("Firebase Notice: Add your real VITE_FIREBASE_API_KEY to .env file to enable Firebase auth & Cloud Firestore.");
}

export { app, db, auth, analytics };
export default app;
