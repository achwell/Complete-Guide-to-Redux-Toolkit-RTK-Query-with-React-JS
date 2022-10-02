import firebase from "firebase/compat/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/firestore"
import "firebase/compat/storage"

const API_KEY = import.meta.env.VITE_FIRBASE_API_KEY
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "rtk-blog-4c171.firebaseapp.com",
    projectId: "rtk-blog-4c171",
    storageBucket: "rtk-blog-4c171.appspot.com",
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
