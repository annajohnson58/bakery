// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // Replace with your actual API key
    authDomain: "YOUR_AUTH_DOMAIN", // Replace with your actual Auth Domain
    projectId: "YOUR_PROJECT_ID", // Replace with your actual Project ID
    storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your actual Storage Bucket
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your actual Messaging Sender ID
    appId: "YOUR_APP_ID", // Replace with your actual App ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };